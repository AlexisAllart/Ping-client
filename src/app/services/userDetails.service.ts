import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { ServerService } from './server.service';
import { ServerCompanyService } from './serverCompany.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  private userDetails: User;

  constructor(
    private server:ServerService,
    private serverCompany:ServerCompanyService
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

  preloadUserDetailsForCompany(id) {
    if (JSON.parse(localStorage.getItem('companyUserId')) !== null)
    {
      return this.serverCompany
      .request('GET', '/user/details/'+id);
    }
  }
}