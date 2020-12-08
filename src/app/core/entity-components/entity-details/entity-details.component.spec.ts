import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from "@angular/core/testing";
import { EntityDetailsComponent } from "./entity-details.component";
import { Observable, of, Subscriber } from "rxjs";
import { MatNativeDateModule } from "@angular/material/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { MatSnackBar } from "@angular/material/snack-bar";
import { PanelConfig, EntityDetailsConfig } from "./EntityDetailsConfig";
import { databaseServiceProvider } from "../../database/database.service.provider";
import { EntityMapperService } from "../../entity/entity-mapper.service";
import { User } from "../../user/user";
import { SessionService } from "../../session/session-service/session.service";
import { ChildPhotoService } from "../../../child-dev-project/children/child-photo-service/child-photo.service";
import { ChildrenModule } from "../../../child-dev-project/children/children.module";
import { MockDatabase } from "../../database/mock-database";
import { Child } from "../../../child-dev-project/children/model/child";
import { ConfirmationDialogService } from "../../confirmation-dialog/confirmation-dialog.service";
import { Database } from "../../database/database";
import { FormConfig } from "./form/FormConfig";

describe("EntityDetailsComponent", () => {
  let component: EntityDetailsComponent;
  let fixture: ComponentFixture<EntityDetailsComponent>;

  let routeObserver: Subscriber<any>;

  const routeConfig: EntityDetailsConfig = {
    icon: "child",
    entity: "Child",
    panels: [
      {
        title: "One Form",
        components: [
          {
            title: "",
            component: "Form",
            config: { cols: [[]] } as FormConfig,
          },
        ],
      },
      {
        title: "Two Components",
        components: [
          { title: "First Component", component: "PreviousSchools" },
          { title: "Second Component", component: "Aser" },
        ],
      },
    ],
  };
  const mockedRoute = {
    paramMap: new Observable((observer) => {
      routeObserver = observer;
      observer.next({ get: () => "new" });
    }),
    data: of(routeConfig),
  };

  const mockedDatabase = new MockDatabase();
  const mockedSession = {
    getCurrentUser: () => new User("test1"),
    getDatabase: () => mockedDatabase,
  };

  const mockChildPhotoService: jasmine.SpyObj<ChildPhotoService> = jasmine.createSpyObj(
    "mockChildPhotoService",
    ["canSetImage", "setImage", "getImageAsyncObservable"]
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ChildrenModule, MatNativeDateModule, RouterTestingModule],
      providers: [
        databaseServiceProvider,
        { provide: Database, useValue: mockedDatabase },
        { provide: SessionService, useValue: mockedSession },
        { provide: ActivatedRoute, useValue: mockedRoute },
        { provide: ChildPhotoService, useValue: mockChildPhotoService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("sets the panels config with child and creating status", fakeAsync(() => {
    const testChild = new Child("Test-Child");
    const entityService = fixture.componentRef.injector.get(
      EntityMapperService
    );
    spyOn(entityService, "load").and.returnValue(Promise.resolve(testChild));
    component.creatingNew = false;
    routeObserver.next({ get: () => testChild.getId() });
    tick();

    component.panels.forEach((p) =>
      p.components.forEach((c) => {
        const panelConfig = c.config as PanelConfig;
        expect(panelConfig.entity).toEqual(testChild);
        expect(panelConfig.creatingNew).toBeFalse();
      })
    );
  }));

  it("should load the correct child on startup", fakeAsync(() => {
    const testChild = new Child("Test-Child");
    const entityService = fixture.componentRef.injector.get(
      EntityMapperService
    );
    spyOn(entityService, "load").and.returnValue(Promise.resolve(testChild));
    routeObserver.next({ get: () => testChild.getId() });
    tick();
    expect(entityService.load).toHaveBeenCalledWith(Child, testChild.getId());
    expect(component.entity).toBe(testChild);
  }));

  it("should route back when deleting is undone", fakeAsync(() => {
    const testChild = new Child("Test-Child");
    component.entity = testChild;
    const dialogRef = fixture.debugElement.injector.get(
      ConfirmationDialogService
    );
    const entityMapper = fixture.debugElement.injector.get(EntityMapperService);
    const snackBar = fixture.debugElement.injector.get(MatSnackBar);
    const router = fixture.debugElement.injector.get(Router);
    const dialogReturn: any = { afterClosed: () => of(true) };
    spyOn(dialogRef, "openDialog").and.returnValue(dialogReturn);
    spyOn(entityMapper, "remove").and.returnValue(Promise.resolve());
    spyOn(entityMapper, "save");
    spyOn(component, "navigateBack");
    const snackBarReturn: any = { onAction: () => of({}) };
    spyOn(snackBar, "open").and.returnValue(snackBarReturn);
    spyOn(router, "navigate");
    component.removeEntity();
    tick();
    expect(dialogRef.openDialog).toHaveBeenCalled();
    expect(entityMapper.remove).toHaveBeenCalledWith(testChild);
    expect(snackBar.open).toHaveBeenCalled();
    expect(entityMapper.save).toHaveBeenCalledWith(testChild, true);
    expect(router.navigate).toHaveBeenCalled();
  }));
});