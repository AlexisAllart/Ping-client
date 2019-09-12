import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from 'src/app/modal/modal.component';
import { UserDetailsService } from 'src/app/services/userDetails.service';
import { TagmodalComponent } from 'src/app/tagmodal/tagmodal.component';
import { ServerCompanyService } from 'src/app/services/serverCompany.service';

@Component({
  selector: 'app-selection-company',
  templateUrl: './selection-company.component.html',
  styleUrls: ['./selection-company.component.scss']
})
export class SelectionCompanyComponent implements OnInit {
  private companyUser;
  private companyUserId = JSON.parse(localStorage.getItem('companyUserId')).id;
  private company_id;
    
  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private userDetailsService: UserDetailsService,
    private serverCompanyService: ServerCompanyService,
    private router: Router
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

  onTagPopup(selection_id) {
    this.dialog.open(TagmodalComponent, {
      data: {
        selection_id: selection_id,
        company_id: this.companyUser.company_id,
        tagList: this.route.snapshot.data.tagList
      }
    });
  }

  onDelete(id) {
    this.serverCompanyService.request("DELETE", "/selection/delete/"+id).subscribe(
      (res)=>this.router.navigateByUrl('/redirect', {skipLocationChange: true}).then(() => this.router.navigate(['/selection-company'])),
      (err)=>this.router.navigateByUrl('/redirect', {skipLocationChange: true}).then(() => this.router.navigate(['/selection-company']))
    );
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
      return array.sort((a, b) => (a.tag_id > b.tag_id) ? 1 : (a.tag_id == b.tag_id) ? ((a.id < b.id) ? 1 : -1) : -1);
    }
    else {
      return array.sort((a, b) => (a.tag_id < b.tag_id) ? 1 : (a.tag_id == b.tag_id) ? ((a.id < b.id) ? 1 : -1) : -1);
    }
  }
}