import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  studentDetails: any;
  studentId: number = 0;
  constructor(public student: StudentService, public activeRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.studentId = this.activeRoute.snapshot.params['id'];
      this.student.StudentById(this.studentId).subscribe({
        next: (result) => {
          console.log(result);
          this.studentDetails = result;
        },
        error: (error) => {
          console.log(error);
        }
      })
  }
}
