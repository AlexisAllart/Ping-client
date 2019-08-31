import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  onCreate(){
    this.dialog.open(ModalComponent);

  }
}
