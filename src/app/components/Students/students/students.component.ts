import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  allStudents:any;

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000, horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
  constructor(public students:StudentService, private _snackBar: MatSnackBar) { }
  
  ngOnInit(): void {
    this.students.GetAllStudents().subscribe({
      next: (result) => {
        console.log(result);
        this.allStudents = result;
      },
      error: (error) => {
        console.log(error);
      }
    })

  }
  deleteStd(id:any){
    this.students.DeleteStudent(id).subscribe({
      next: (result) => {
        this.openSnackBar('Students Deleted Successfully', 'Close');
        this.ngOnInit();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
