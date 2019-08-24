import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent implements OnInit {
  private companyList;
  private contractTypeList;
  private keyWordList;
  private offerList;
  private statusList;
  private tagList;

  constructor(
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    console.log(this.route.snapshot.data);
    console.log(this.route.snapshot.data.companyList);
    console.log(this.route.snapshot.data.contractTypeList);
    console.log(this.route.snapshot.data.keyWordList);
    console.log(this.route.snapshot.data.offerList);
    console.log(this.route.snapshot.data.statusList);
    console.log(this.route.snapshot.data.tagList);
  }
}