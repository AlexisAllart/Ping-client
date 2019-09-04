import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ModalComponent } from 'src/app/modal/modal.component';
import { UserDetailsService } from 'src/app/services/userDetails.service';
import { StatusmodalComponent } from 'src/app/statusmodal/statusmodal.component';

@Component({
  selector: 'app-ping',
  templateUrl: './ping.component.html',
  styleUrls: ['./ping.component.scss']
})
export class PingComponent implements OnInit {
private user;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private userDetailsService: UserDetailsService
    ) { 
  }

  ngOnInit() { }

  onCreate(id){
    this.userDetailsService.preloadUserDetailsForCompany(id).subscribe(res => {
      this.dialog.open(ModalComponent, {
        data: {
          user: res
        }
      })
    });
  }

  openDialog(id) {
    this.dialog.open(StatusmodalComponent, {
      data: {
        statut: this.route.snapshot.data.statusList[id]
      }
    });
  }
}