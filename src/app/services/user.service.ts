import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User.model';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userList: Array<User>;

  constructor(
    private http:HttpClient,
    private server: ServerService
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
      return this.server
      .request('GET', '/user/list');
    }
  }
}