import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.scss']
})
export class ProfileCompanyComponent implements OnInit {

  private companyUserId=JSON.parse(localStorage.getItem('companyUserId')).id;
  private companyUser;
  private formDescriptionCompany: FormGroup;
  private formNameCompany: FormGroup;
  private formName: FormGroup;
  private formMail: FormGroup;
  private formPhone: FormGroup;
  private formPassword: FormGroup;
  private formFacebook: FormGroup;
  private formTwitter: FormGroup;
  private formLinkedin: FormGroup;
  private formLink: FormGroup;

  private click: boolean;
  
  
  votreNom= "COMPANY_NAME";
  votreMail = "COMPANY_EMAIL";
  votrePhone = "COMPANY_PHONE";
  votrePassword = "COMPANY_PASSWORD";
  
  constructor(
    private route: ActivatedRoute,
    private serverService: ServerService,
    private fb: FormBuilder,
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
    this.formDescriptionCompany = this.fb.group({
      description: [this.companyUser.Company.about]
    });
    this.formNameCompany = this.fb.group({
      name: [this.companyUser.Company.name, Validators.email]
    });
    this.formName = this.fb.group({
      name: [this.companyUser.Company.name, Validators.email]
    });
    this.formMail = this.fb.group({
      email: [this.companyUser.Company.email, Validators.required]
    });
    this.formPhone = this.fb.group({
      phone: [this.companyUser.Company.phone, Validators.required]
    });
    this.formPassword = this.fb.group({
      password: [this.companyUser.Company.password, Validators.required]
    });
    this.formFacebook = this.fb.group({
      facebook: [this.companyUser.Company.facebook, Validators.required]
    });
    this.formTwitter = this.fb.group({
      twitter: [this.companyUser.Company.twitter, Validators.required]
    });
    this.formLinkedin = this.fb.group({
      linkedin: [this.companyUser.Company.linkedin, Validators.required]
    });
    this.formLink = this.fb.group({
      link: [this.companyUser.Company.link, Validators.required]
    });
  }

  onClick(){
  this.click=!this.click;
}
}