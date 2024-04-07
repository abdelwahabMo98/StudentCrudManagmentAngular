import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './components/Students/students/students.component';
import { StudentDetailsComponent } from './components/Students/student-details/student-details.component';
import { EditStudentComponent } from './components/Students/edit-student/edit-student.component';
import { AddStudentComponent } from './components/Students/add-student/add-student.component';

const routes: Routes = [
  {path: 'students', component: StudentsComponent},
  {path: 'student/:id', component: StudentDetailsComponent},
  {path: 'edit-student/:id', component: EditStudentComponent},
  {path: 'add-student', component: AddStudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
