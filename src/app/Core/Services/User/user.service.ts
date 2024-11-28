import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../API/api.service';
import { Users } from '../../Interfaces/users';
import { userEndPoint } from '../../const/userConstant';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService {

  constructor(http:HttpClient) { 
    super(http)
  }

  getAllUsers(data:any):Observable<any[]>{
    return this.http.post<any[]>(`${this.apiURL}${userEndPoint.GET_ALL_USERS}`,data, { headers: this.getHeaders() });
  }

  addUser(data:any):Observable<any>{
    return this.http.post(`${this.apiURL}${userEndPoint.ADD_USER}`,data);
  }

  getUser(data:any):Observable<any>{
   return this.http.post(`${this.apiURL}${userEndPoint.GET_USER}`,data)
  }

  updateUser(data:any):Observable<any>{
    return this.http.post(`${this.apiURL}${userEndPoint.UPDATE_USER}`,data);

  }


}
