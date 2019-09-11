import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from 'src/app/modal/modal.component';
import { UserDetailsService } from 'src/app/services/userDetails.service';
import { TagmodalComponent } from 'src/app/tagmodal/tagmodal.component';

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

  onTagPopup(selection_id) {
    this.dialog.open(TagmodalComponent, {
      data: {
        selection_id: selection_id,
        company_id: this.companyUser.company_id,
        tagList: this.route.snapshot.data.tagList
      }
    });
  }
}