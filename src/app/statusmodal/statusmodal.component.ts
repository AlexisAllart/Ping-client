import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ServerCompanyService } from '../services/serverCompany.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statusmodal',
  templateUrl: './statusmodal.component.html',
  styleUrls: ['./statusmodal.component.scss']
})
export class StatusmodalComponent implements OnInit {

  private ping_id;
  private company_id;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private serverCompanyService: ServerCompanyService,
    private router: Router
  ){
    this.ping_id = this.data.ping_id;
    this.company_id = this.data.company_id;
   }

  ngOnInit() {

  }

  blueClick() {
    this.serverCompanyService.request("PUT", "/ping/edit/"+this.ping_id, {status_id: 1, company_id: this.company_id}).subscribe(()=>this.redirect());
    this.redirect();
  }

  redClick() {
    this.serverCompanyService.request("PUT", "/ping/edit/"+this.ping_id, {status_id: 2, company_id: this.company_id}).subscribe(()=>this.redirect());
    this.redirect();
  }

  greenClick() {
    this.serverCompanyService.request("PUT", "/ping/edit/"+this.ping_id, {status_id: 3, company_id: this.company_id}).subscribe(()=>this.redirect());
  }

  redirect() {
    // TEMP SOLUTION TO REFRESH PAGE
    this.router.navigateByUrl('/redirect', {skipLocationChange: true}).then(() =>
    this.router.navigate(['/ping']));
  }
}
