import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.scss']
})
export class ProfileCompanyComponent implements OnInit {

  private companyUserId=JSON.parse(localStorage.getItem('companyUserId')).id;
  private companyUser;
  
  votreNom= "COMPANY_NAME";
  votreMail = "COMPANY_EMAIL";
  votrePhone = "COMPANY_PHONE";
  votrePassword = "COMPANY_PASSWORD";
  
  constructor(
    private route: ActivatedRoute
    ) { 
      let id = this.companyUserId;
      this.companyUser = this.route.snapshot.data.companyUserList.find(function(x) {
        return x.id = id;
      });
  }
    
  ngOnInit() {
    this.votreNom = this.companyUser.Company.name;
    this.votreMail = this.companyUser.Company.email;
    this.votrePhone = this.companyUser.Company.phone;
    this.votrePassword = this.companyUser.Company.password;
  }

}
