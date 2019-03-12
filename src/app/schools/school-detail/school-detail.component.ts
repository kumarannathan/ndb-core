import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {School} from '../school';
import {SchoolsService} from '../schools.service';
import {EntityMapperService} from '../../entity/entity-mapper.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import uniqid from 'uniqid';
import {AlertService} from '../../alerts/alert.service';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {ConfirmationDialogService} from '../../ui-helper/confirmation-dialog/confirmation-dialog.service';
import {Child} from '../../children/child';
import {Location} from '@angular/common';

@Component({
  selector: 'app-school-detail',
  templateUrl: './school-detail.component.html',
  styleUrls: ['./school-detail.component.css']
})
export class SchoolDetailComponent implements OnInit {
  school = new School('');

  studentDataSource: MatTableDataSource<Child> = new MatTableDataSource();
  displayedColumns = ['id', 'name', 'schoolClass', 'age'];

  form: FormGroup;
  creatingNew = false;
  editing = false;

  initializeForm() {
    this.form = this.fb.group({
      name:           [{value: this.school.name,          disabled: !this.editing}],
      address:        [{value: this.school.address,       disabled: !this.editing}],
      phone:          [{value: this.school.phone,         disabled: !this.editing}],
      medium:         [{value: this.school.medium,        disabled: !this.editing}],
      timing:         [{value: this.school.timing,        disabled: !this.editing}],
      upToClass:      [{value: this.school.upToClass,     disabled: !this.editing}],
      remarks:        [{value: this.school.remarks,       disabled: !this.editing}],
      academicBoard:  [{value: this.school.academicBoard, disabled: !this.editing}],
      workingDays:    [{value: this.school.workingDays,   disabled: !this.editing}],
      website:        [{value: this.school.website,       disabled: !this.editing}],
      privateSchool:  [{value: this.school.privateSchool, disabled: !this.editing}]
    });
  }

  constructor(
    private ss: SchoolsService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    @Inject(FormBuilder) public fb: FormBuilder,
    private entityMapperService: EntityMapperService,
    private alertService: AlertService,
    private snackBar: MatSnackBar,
    private confirmationDialog: ConfirmationDialogService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id === 'new') {
      this.creatingNew = true;
      this.editing = true;
      this.school = new School(uniqid());
    } else {
      this.loadSchool(id);
    }
    this.initializeForm();
  }

  enableEdit() {
    this.editing = true;
    this.initializeForm();
  }

  disableEdit() {
    this.editing = false;
    this.initializeForm();
  }

  loadSchool(id: string) {
    this.entityMapperService.load<School>(School, id)
      .then(school => this.school = school)
      .then(() => this.initializeForm())
      .then(() => this.loadStudents());
  }

  loadStudents() {
    // TODO: load only children related to this school through a method of SchoolService (to be implemented)
    this.entityMapperService.loadType<Child>(Child)
      .then(children => {
        return children.filter(child => {
          return child.schoolId === this.school.getId();
        })
      })
      .then(children => {
        this.studentDataSource.data = children;
      });
  }


  studentClick(id: number) {
    this.router.navigate(['/child', id]);
  }


  removeSchool() {
    const dialogRef = this.confirmationDialog
      .openDialog('Delete?', 'Are you sure you want to delete this School?');

    dialogRef.afterClosed()
      .subscribe(confirmed => {
        if (confirmed) {
          this.entityMapperService.remove<School>(this.school)
            .then(() => this.router.navigate(['/school']));

          const snackBarRef = this.snackBar.open('Deleted School "' + this.school.name + '"', 'Undo', {duration: 8000});
          snackBarRef.onAction().subscribe(() => {
            this.entityMapperService.save(this.school, true);
            this.router.navigate(['/school', this.school.getId()]);
          });
        }
      });
  }

  saveSchool() {
    this.assignFormValuesToChild(this.school, this.form);

    this.entityMapperService.save<School>(this.school)
      .then(() => {
        if (this.creatingNew) {
          this.router.navigate(['/school', this.school.getId()]);
          this.creatingNew = false;
        }
        this.disableEdit();
      })
      .catch((err) => this.alertService.addDanger('Could not save School "' + this.school.name + '": ' + err));
  }

  private assignFormValuesToChild(school: School, form: FormGroup) {
    Object.keys(form.controls).forEach(key => {
      school[key] = form.get(key).value;
    });
  }

  navigateBack() {
    this.location.back();
  }
}