import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User.model';
import { Ping } from '../models/Ping.model';
import { ServerService } from './server.service';
import { AuthService } from './auth.service';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User;
  private pingList: Array<Ping>;

  constructor(private http:HttpClient, private server:ServerService, private auth:AuthService) {}

  // QOL METHOD
  loadAll(): void {
    this.loadUser();
    this.loadPingList();
    interval(60000).subscribe(() => this.loadUser());
    interval(60000).subscribe(() => this.loadPingList());
  }

  checkAll(): void {
    if (this.getUser() && this.getPingList()) {}
    else {
      this.loadAll();
    }
  }

  // GETTERS
  getUser(): User {
    return this.user;
  }

  getPingList(): Array<Ping> {
    return this.pingList;
  }

  // SETTERS
  setUser(user: User) {
    this.user = user;
    return this;
  }

  setPingList(array: Array<Ping>) {
    this.pingList = array;
  }

  // LOAD LISTS WITH DATA FROM DB (ALL USER DATA)
  loadUser(): void {
    this.server.request('GET', '/user/details/'+JSON.parse(localStorage.getItem('id')).id).subscribe((data: User) => {
      this.setUser(data);
      console.log("userService.user successfully loaded :");
      console.log(this.getUser());
    });
  }

  loadPingList(): void {
    this.server.request('GET', '/ping/list').subscribe((data: Array<Ping>) => {
      this.setPingList(data);
      console.log("userService.pingList successfully loaded :");
      console.log(this.getPingList());
    });
  }
}