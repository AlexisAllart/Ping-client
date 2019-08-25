import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { ServerCompanyService } from './serverCompany.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userList: Array<User>;

  constructor(
    private serverCompany: ServerCompanyService
  ) { }

  getUserList(): Array<User> {
    return this.userList;
  }

  setUserList(array: Array<User>) {
    this.userList = array;
    return this;
  }

  preloadUserList() {
    if (JSON.parse(localStorage.getItem('companyUserId')) !== null)
    {
      return this.serverCompany
      .request('GET', '/user/list');
    }
  }
}