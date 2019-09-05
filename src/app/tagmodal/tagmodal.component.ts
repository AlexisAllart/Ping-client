import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ServerCompanyService } from '../services/serverCompany.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tagmodal',
  templateUrl: './tagmodal.component.html',
  styleUrls: ['./tagmodal.component.scss']
})
export class TagmodalComponent implements OnInit {

  private selection_id;
  private company_id;
  private tagList;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private serverCompanyService: ServerCompanyService,
  private router: Router
  ) {
    this.selection_id = this.data.selection_id;
    this.company_id = this.data.company_id;
    this.tagList = this.data.tagList;
  }

  ngOnInit() {

  }

  click(id) {
    this.serverCompanyService.request("PUT", "/selection/edit/"+this.selection_id, {tag_id: id, company_id: this.company_id}).subscribe(()=>this.redirect());
  }

  redirect() {
    // TEMP SOLUTION TO REFRESH PAGE
    this.router.navigateByUrl('/redirect', {skipLocationChange: true}).then(() =>
    this.router.navigate(['/selection-company']));
  }
}