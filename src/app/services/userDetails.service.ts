import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User.model';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  private userDetails: User;

  constructor(
    private http:HttpClient,
    private server:ServerService
    ) { }

  getUserDetails(): User {
    return this.userDetails;
  }

  setUserDetails(userDetails) {
    this.userDetails = userDetails;
    return this;
  }

  preloadUserDetails() {
    if (JSON.parse(localStorage.getItem('id')) !== null)
    {
      return this.server
      .request('GET', '/user/details/'+JSON.parse(localStorage.getItem('id')).id);
    }
  }
}