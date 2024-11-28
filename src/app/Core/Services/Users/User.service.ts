import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../API/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService {

constructor(http:HttpClient) { 
  super(http)
}

getAllUsers(data:any):Observable<any>{
  return this.http.post(`${this.apiURL}/profile/getallusers`,data, { headers: this.getHeaders() });
}

addUsers(data:any):Observable<any>{
  return this.http.post(`${this.apiURL}/profile/adduser`,data);
}
}
