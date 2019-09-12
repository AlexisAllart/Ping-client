import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ModalComponent } from 'src/app/modal/modal.component';
import { UserDetailsService } from 'src/app/services/userDetails.service';
import { StatusmodalComponent } from 'src/app/statusmodal/statusmodal.component';
import { AuthCompanyService } from 'src/app/services/authCompany.service';

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
      return x.id == id;
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

  private nameToggle = false;
  sortByUserName(array) {
    this.nameToggle=!this.nameToggle;
    if (this.nameToggle) {
      return array.sort((a, b) => (a.User.lastName > b.User.lastName) ? 1 : (a.User.lastName == b.User.lastName) ? ((a.id < b.id) ? 1 : -1) : -1);
    } else {
      return array.sort((a, b) => (a.User.lastName < b.User.lastName) ? 1 : (a.User.lastName == b.User.lastName) ? ((a.id < b.id) ? 1 : -1) : -1);
    }
  }

  private titleToggle = false;
  sortByTitle(array) {
    this.titleToggle=!this.titleToggle;
    if (this.titleToggle) {
      return array.sort((a, b) => (a.Offer.title > b.Offer.title) ? 1 : (a.Offer.title == b.Offer.title) ? ((a.id < b.id) ? 1 : -1) : -1);
    } else {
      return array.sort((a, b) => (a.Offer.title < b.Offer.title) ? 1 : (a.Offer.title == b.Offer.title) ? ((a.id < b.id) ? 1 : -1) : -1);
    }
  }

  private idToggle = false;
  sortById(array) {
    this.idToggle=!this.idToggle;
    if (this.idToggle) {
      return array.sort((a, b) => (a.updatedAt > b.updatedAt) ? 1 : -1);
    }
    else {
      return array.sort((a, b) => (a.updatedAt < b.updatedAt) ? 1 : -1);
    }
  }

  private statusToggle = false;
  sortByStatus(array) {
    this.statusToggle=!this.statusToggle;
    if (this.statusToggle) {
      return array.sort((a, b) => (a.status_id > b.status_id) ? 1 : (a.status_id == b.status_id) ? ((a.id < b.id) ? 1 : -1) : -1);
    }
    else {
      return array.sort((a, b) => (a.status_id < b.status_id) ? 1 : (a.status_id == b.status_id) ? ((a.id < b.id) ? 1 : -1) : -1);
    }
  }
}