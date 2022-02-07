import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ErrorHintComponent } from "./error-hint.component";
import { KeysPipeModule } from "../../../keys-pipe/keys-pipe.module";
import { FormControl, Validators } from "@angular/forms";
import { By } from "@angular/platform-browser";

describe("ErrorHintComponent", () => {
  let component: ErrorHintComponent;
  let fixture: ComponentFixture<ErrorHintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorHintComponent],
      imports: [KeysPipeModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorHintComponent);
    component = fixture.componentInstance;
    component.form = new FormControl();
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should be empty when there are no errors", () => {
    const ellElements = fixture.debugElement.queryAll(By.css("div"));
    expect(ellElements).toHaveSize(0);
  });

  it("should contain an entry when there is one error", async () => {
    component.form = new FormControl("", Validators.required);
    fixture.detectChanges();
    await fixture.whenStable();
    const ellElements = fixture.debugElement.queryAll(By.css("div"));
    expect(ellElements).toHaveSize(1);
  });
});