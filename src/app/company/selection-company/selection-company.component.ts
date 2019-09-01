import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { Selection } from 'src/app/models/Selection.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from 'src/app/modal/modal.component';

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
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit() { }

  onCreate(id){
    this.dialog.open(ModalComponent, {
      data: {
        user: this.route.snapshot.data.userList[id],
        keyWordList: this.route.snapshot.data.keyWordList
      }
    });
  }
}