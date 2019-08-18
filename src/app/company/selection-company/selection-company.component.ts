import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { User } from 'src/app/models/User.model';
import { Selection } from 'src/app/models/Selection.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-selection-company',
  templateUrl: './selection-company.component.html',
  styleUrls: ['./selection-company.component.scss']
})
export class SelectionCompanyComponent implements OnInit {

    // click(event: Event): void {
    //   console.log("hello");

    //   const button = event.target as HTMLButtonElement;

    //   button.style.backgroundColor= 'yellow';
    // }

    show = false;
  
    // onClick(){
    //   console.log('hello');
    // }



    //Lists
    selectionList: Array<Selection> ={} as Array<Selection>;
    userList : Array<User> = {} as Array<User>;

    //Variables
    private selectionListLoaded = false;
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
    this.getSelectionList();
    this.getUserList();
  }

  getSelectionList(): void {
    this.http.get<Array<Selection>>('http://pingjob.herokuapp.com/selection/list')
      // .pipe(map(data => data))
      .subscribe(
        (selectionList:Array<Selection>) => {
          this.selectionList=selectionList;
          this.selectionListLoaded = true;
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