import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseUrl: string = 'http://localhost:7223/api/Student';
  constructor(public http:HttpClient) { }
  GetAllStudents(){
    return this.http.get(this.baseUrl);
  }
  DeleteStudent(id:any){
    return this.http.delete(this.baseUrl + '/' + id);
  }
  StudentById(id:any){
    return this.http.get(this.baseUrl + '/' + id);
  }
  EditStudent(data:any){
    return this.http.put(this.baseUrl, data);
  }
  AddStudent(data:any){
    return this.http.post(this.baseUrl, data);
  }
}
