import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyUser } from 'src/app/models/CompanyUser.model';

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.scss']
})
export class ProfileCompanyComponent implements OnInit {

  private companyUserId=JSON.parse(localStorage.getItem('companyUserId')).id;
  private companyUser: CompanyUser;
  
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
    this.votreNom = this.route.snapshot.data.companyList[this.companyUser.company_id-1].name;
    this.votreMail = this.route.snapshot.data.companyList[this.companyUser.company_id-1].email;
    this.votrePhone = this.route.snapshot.data.companyList[this.companyUser.company_id-1].phone;
    this.votrePassword = this.route.snapshot.data.companyList[this.companyUser.company_id-1].password;
  }

}
