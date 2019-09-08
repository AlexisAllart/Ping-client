import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServerCompanyService } from '../services/serverCompany.service';
import { ServerService } from '../services/server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deleteModal',
  templateUrl: './deleteModal.component.html',
  styleUrls: ['./deleteModal.component.scss']
})
export class DeleteModalComponent implements OnInit {
  private id;
  private routeTarget;
  private routeOrigin;
  private userType;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private router: Router,
      private serverCompanyService: ServerCompanyService,
      private serverService: ServerService
    ) {
      this.id = this.data.id;
      this.routeTarget = this.data.routeTarget;
      this.routeOrigin = this.data.routeOrigin;
      this.userType = this.data.userType;
    }

  ngOnInit() {

  }

  onSubmit() {
    if (this.userType == 'user') {
      this.serverService.request("DELETE", this.routeTarget+this.id).subscribe(
        result=>this.redirect(),
        err=>this.redirect()
      );
    }
    if (this.userType == 'companyUser') {
      this.serverCompanyService.request("DELETE", this.routeTarget+this.id).subscribe(
        result=>this.redirect(),
        err=>this.redirect()
      );
    }
  }
  
  redirect() {
    // TEMP SOLUTION TO REFRESH PAGE
    this.router.navigateByUrl('/redirect', {skipLocationChange: true}).then(() =>
    this.router.navigate([this.routeOrigin]));
  }
}
