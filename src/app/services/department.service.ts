import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(public http:HttpClient) { }
  baseUrl: string = 'http://localhost:7223/api/Department';
  GetAllDepartments(){
    return this.http.get(this.baseUrl);
  }
}
