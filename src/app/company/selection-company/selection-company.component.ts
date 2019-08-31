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