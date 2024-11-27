import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileVerifierService {

  apiURL:string="http://localhost:8443";


  constructor(private http: HttpClient) { }

  // get User
  // getUser(mobno: number): Observable<any> {
  //   return this.http.post(`${this.apiURL}${Users.GET_USER}`, mobno);
  // }

  // Get All users
  getUserList(data: any): Observable<any> {
    return this.http.post(`${this.apiURL}/profile/getallusers`, data);
  }

  // // Add User
  // addUser(data: any): Observable<AddUserProfile> {
  //   return this.http.post(`${this.apiURL}${Users.ADD_USER}`, data);
  // }
  // // Update User 
  // updateUser(data: any): Observable<AddUserProfile> {
  //   return this.http.put(`${this.apiURL}${Users.UPDATE_USER}`, data);
  // }
  // // for view profile details
  // getProfileByProfileId(profileId: any): Observable<any> {
  //   return this.http.get(`${this.apiURL}${Users.GET_PROFILE_BY_PROFILE_ID}/${profileId}`);
  // }

}
