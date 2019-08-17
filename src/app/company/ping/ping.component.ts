import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Ping } from 'src/app/models/Ping.model';
import { User } from 'src/app/models/User.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ping',
  templateUrl: './ping.component.html',
  styleUrls: ['./ping.component.scss']
})

export class PingComponent implements OnInit {

  //Lists

  pingList : Array<Ping> = {} as Array<Ping>;
  userList : Array<User> = {} as Array<User>;

  // Variables 
  private pingListLoaded = false;
  private userListLoaded = false; 

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.getAll()
    interval(300000)
    .subscribe(
      () => this.getAll()
    );
  }

  getAll() {
    this.getPingList();
    this.getUserList();

  }

  getPingList(): void {
    this.http.get<Array<Ping>>('http://pingjob.herokuapp.com/ping/list')
      // .pipe(map(data => data))
      .subscribe(
        (pingList:Array<Ping>) => {
          this.pingList=pingList;
          this.pingListLoaded = true;
        },
        err => {
          console.log(err);
        }
      );
  }

  getUserList(){
    this.http.get<Array<User>>('hhttp://pingjob.herokuapp.com/user/list')
    // .pipe(map(data => data))
    .subscribe(
      (userList:Array<User>) => {
        this.userList=userList;
        this.userListLoaded = true;
      },
      err => {
        console.log(err);
      }
    );
  }

}
