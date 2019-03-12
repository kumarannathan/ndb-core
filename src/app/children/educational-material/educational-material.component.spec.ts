import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalMaterialComponent } from './educational-material.component';
import {UiHelperModule} from '../../ui-helper/ui-helper.module';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ChildrenService} from '../children.service';
import {EntityMapperService} from '../../entity/entity-mapper.service';
import {MockDatabase} from '../../database/mock-database';
import {Child} from '../child';
import {DatePipe} from '@angular/common';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {of} from 'rxjs';

describe('EducationalMaterialComponent', () => {
  let component: EducationalMaterialComponent;
  let fixture: ComponentFixture<EducationalMaterialComponent>;

  const mockChildrenService = {
    getChild: (id) => {
      return of([new Child('22')]);
    },
    getEducationalMaterialsOfChild: (id) => {
      return of([]);
    }
  };
  let mockEntityMapper;


  beforeEach(async(() => {
    mockEntityMapper = new EntityMapperService(new MockDatabase());

    TestBed.configureTestingModule({
      declarations: [ EducationalMaterialComponent ],
      imports: [ UiHelperModule, FormsModule, NoopAnimationsModule],
      providers: [
        DatePipe,
        { provide: ActivatedRoute, useValue: {paramMap: of({get: () => '22'}) } },
        { provide: ChildrenService, useValue: mockChildrenService },
        { provide: EntityMapperService, useValue: mockEntityMapper },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});