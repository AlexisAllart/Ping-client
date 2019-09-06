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
private companyUser;
private companyUserId = JSON.parse(localStorage.getItem('companyUserId')).id;
private company_id;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private userDetailsService: UserDetailsService
  ) {
    let id = this.companyUserId;
    this.companyUser = this.route.snapshot.data.companyUserList.find(function(x) {
      return x.id = id;
    });
  }

  ngOnInit() {
    this.dialog.closeAll();
  }

  onCreate(id){
    this.userDetailsService.preloadUserDetailsForCompany(id).subscribe(res => {
      this.dialog.open(ModalComponent, {
        data: {
          user: res
        }
      })
    });
  }

  onStatusPopup(ping_id) {
    this.dialog.open(StatusmodalComponent, {
      data: {
        ping_id: ping_id,
        company_id: this.companyUser.company_id,
        statusList: this.route.snapshot.data.statusList
      }
    });
  }
}