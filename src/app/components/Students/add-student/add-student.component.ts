import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from 'src/app/services/department.service';
import { StudentService } from 'src/app/services/student.service';
import {
  MatSnackBar
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  departments: any;
  constructor(public student: StudentService,
    public dept: DepartmentService,
    public activeRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    public router: Router
  ) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000, horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
  ngOnInit(): void {
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
    name: new FormControl(''),
    age: new FormControl(''),
    address: new FormControl(''),
    deptId: new FormControl(''),
    image: new FormControl(''),
  })

  addStudent(data: any) {
    data.preventDefault();
    this.student.AddStudent(this.studentForm.value).subscribe({
      next: (result: any) => {
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
        this.openSnackBar('Failed to Add Student', 'Close');
      }
    });
  }
}
