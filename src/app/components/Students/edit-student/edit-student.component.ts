import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from 'src/app/services/department.service';
import { StudentService } from 'src/app/services/student.service';
import {
  MatSnackBar
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  constructor(public student: StudentService,
    public dept: DepartmentService,
    public activeRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    public router: Router
  ) { }
  departments: any;
  studentId: any;
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000, horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  ngOnInit(): void {
    this.studentId = this.activeRoute.snapshot.params['id'];
    this.studentForm.controls['id'].setValue(this.studentId);
    this.student.StudentById(this.studentId).subscribe({
      next: (result: any) => {
        console.log(result);
        this.studentForm.controls['name'].setValue(result.name);
        this.studentForm.controls['age'].setValue(result.age);
        this.studentForm.controls['address'].setValue(result.address);
        this.studentForm.controls['deptId'].setValue(result.deptId);
        this.studentForm.controls['image'].setValue(result.image);
      },
      error: (error) => {
        console.log(error);
      }
    })
    this.dept.GetAllDepartments().subscribe({
      next: (result) => {
        this.departments = result;
        console.log(this.departments);
      },
      error: (error) => {
        console.log(error);
      }
    })

  }
  studentForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    age: new FormControl(''),
    address: new FormControl(''),
    deptId: new FormControl(''),
    image: new FormControl(''),
  })

  editStudent(data: any) {
    data.preventDefault();
    this.student.EditStudent(this.studentForm.value).subscribe({
      next: (result: any) => {
        console.log(result);
        if (result.message ==
          "Student Updated Successfully") {
          this.openSnackBar('Student Updated Successfully', 'Close');
          this.router.navigate(['/students']);
        }

        else
          this._snackBar.open('Failed to update student', 'Close');
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}