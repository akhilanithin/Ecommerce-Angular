import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  SERVER_URL = "http://localhost:3000"
  constructor(private http:HttpClient) { }

  getAllProjectsAPI =  ()=>{
    return this.http.get(`${this.SERVER_URL}/products/all`)
  }

  viewProductAPI =  (id:any)=>{
    return this.http.get(`${this.SERVER_URL}/products/view/${id}`)
  }

  registerAPI = (user:any)=>{
    return this.http.post(`${this.SERVER_URL}/user/register`,user)
  }

  loginAPI = (user:any)=>{
    return this.http.post(`${this.SERVER_URL}/user/login`,user)
  }


}
