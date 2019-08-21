import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private commonService: CommonService, private publicService: PublicService) { }

  ngOnInit() {
    this.commonService.getAll();
    this.publicService.getAll();
    // console.log(this.commonService.keyWordList);
    // console.log(this.commonService.statusList);
    // console.log(this.commonService.tagList);
    // console.log(this.publicService.companyList);
    // console.log(this.publicService.offerList);
  }
}
