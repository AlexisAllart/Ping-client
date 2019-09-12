import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DeleteModalComponent } from 'src/app/deleteModal/deleteModal.component';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.dialog.closeAll();
  }

  onDelete(id) {
    this.dialog.open(DeleteModalComponent, {
      data: {
        id: id,
        routeTarget: "/ping/delete/",
        routeOrigin: "/dashboard-user",
        userType: 'user',
      }
    })
  }

  private companyToggle = false;
  sortByUserName(array) {
    this.companyToggle=!this.companyToggle;
    if (this.companyToggle) {
      return array.sort((a, b) => (a.Company.name > b.Company.name) ? 1 : (a.Company.name == b.Company.name) ? ((a.id < b.id) ? 1 : -1) : -1);
    } else {
      return array.sort((a, b) => (a.Company.name < b.Company.name) ? 1 : (a.Company.name == b.Company.name) ? ((a.id < b.id) ? 1 : -1) : -1);
    }
  }

  private titleToggle = false;
  sortByTitle(array) {
    this.titleToggle=!this.titleToggle;
    if (this.titleToggle) {
      return array.sort((a, b) => (a.title > b.title) ? 1 : (a.title == b.title) ? ((a.id < b.id) ? 1 : -1) : -1);
    } else {
      return array.sort((a, b) => (a.title < b.title) ? 1 : (a.title == b.title) ? ((a.id < b.id) ? 1 : -1) : -1);
    }
  }

  private idToggle = false;
  sortById(array) {
    this.idToggle=!this.idToggle;
    if (this.idToggle) {
      return array.sort((a, b) => (a.id > b.id) ? 1 : -1);
    }
    else {
      return array.sort((a, b) => (a.id < b.id) ? 1 : -1);
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