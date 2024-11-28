import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../API/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentService extends ApiService {

  constructor(http:HttpClient) { 
    super(http)
  }

  getAllAgents():Observable<any[]>{
    return this.http.get<any[]>(this.apiURL, { headers: this.getHeaders() });
  }

  addAgents(data:any):Observable<any>{
    return this.http.post(`${this.apiURL}/profile/adduser`,data);
  }
}
