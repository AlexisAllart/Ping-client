import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { User } from 'src/app/models/User.model';
import { Selection } from 'src/app/models/Selection.model';
import { ActivatedRoute } from '@angular/router';

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
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() { }
}