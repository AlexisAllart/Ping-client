import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-statusmodal',
  templateUrl: './statusmodal.component.html',
  styleUrls: ['./statusmodal.component.scss']
})
export class StatusmodalComponent implements OnInit {

  private status;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any){
    this.status = this.data.status;
   }

  ngOnInit() {
  }

}
