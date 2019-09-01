import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  template: 'passed in {{ data.userList }}',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  private user;
  private keyWordList;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.user = this.data.user;
    this.keyWordList = this.data.keyWordList;
   }

  ngOnInit() {
    console.log(this.user);
    console.log(this.keyWordList);
  }
}
