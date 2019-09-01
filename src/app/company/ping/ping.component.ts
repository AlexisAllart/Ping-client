import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ModalComponent } from 'src/app/modal/modal.component';

@Component({
  selector: 'app-ping',
  templateUrl: './ping.component.html',
  styleUrls: ['./ping.component.scss']
})
export class PingComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog) { 
     }

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