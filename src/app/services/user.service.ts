import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userList: Array<User>;
  private server: ServerService;

  constructor(private http:HttpClient) { }

  sendUserList() {
    this.loadUserList();
    return this.getUserList();
  }

  getUserList(): Array<User> {
    return this.userList;
  }

  setUserList(array: Array<User>) {
    this.userList = array;
    return this;
  }

  preloadUser() {
    if (JSON.parse(localStorage.getItem('id')) !== null)
    {
      return this.server
      .request('GET', '/user/details/'+JSON.parse(localStorage.getItem('id')).id);
    }
  }

  loadUserList() {
    return this.server.request('GET', '/user/list/');
  }

  preloadUserList() {
    return this.http.get('http://pingjob.herokuapp.com/user/list');
  }
}