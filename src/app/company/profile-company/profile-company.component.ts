import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServerCompanyService } from 'src/app/services/serverCompany.service';
import { MatDialog } from '@angular/material';
import { DeleteModalComponent } from 'src/app/deleteModal/deleteModal.component';

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.scss']
})
export class ProfileCompanyComponent implements OnInit {

  private companyUserId=JSON.parse(localStorage.getItem('companyUserId')).id;
  private companyUser;

  private formAbout: FormGroup;
  private formName: FormGroup;
  private formEmail: FormGroup;
  private formPhone: FormGroup;
  private formPassword: FormGroup;
  private formFacebook: FormGroup;
  private formTwitter: FormGroup;
  private formLinkedin: FormGroup;
  private formLink: FormGroup;

  private clickAbout: boolean = false;
  private clickName: boolean = false;
  private clickEmail: boolean = false;
  private clickPhone: boolean = false;
  private clickPassword: boolean = false;
  private clickFacebook: boolean = false;
  private clickTwitter: boolean = false;
  private clickLinkedin: boolean = false;
  private clickLink: boolean = false;
  
  votreNom= "COMPANY_NAME";
  votreMail = "COMPANY_EMAIL";
  votrePhone = "COMPANY_PHONE";
  votrePassword = "COMPANY_PASSWORD";
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serverCompanyService: ServerCompanyService,
    private fb: FormBuilder,
    private dialog: MatDialog
    ) { 
      let id = this.companyUserId;
      this.companyUser = this.route.snapshot.data.companyUserList.find(function(x) {
        return x.id == id;
      });
  }
    
  ngOnInit() {
    this.votreNom = this.companyUser.Company.name;
    this.votreMail = this.companyUser.Company.email;
    this.votrePhone = this.companyUser.Company.phone;
    this.votrePassword = this.companyUser.Company.password;

    this.formAbout = this.fb.group({
      about: [this.companyUser.Company.about, Validators.required]
    });
    this.formName = this.fb.group({
      name: [this.companyUser.Company.name, Validators.email]
    });
    this.formEmail = this.fb.group({
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

  onClickAbout(){
    this.clickAbout=!this.clickAbout;
    this.clickName=false;
    this.clickEmail=false;
    this.clickPhone=false;
    this.clickPassword=false;
    this.clickFacebook=false;
    this.clickTwitter=false;
    this.clickLinkedin=false;
    this.clickLink=false;
  }

  onClickName(){
    this.clickName=!this.clickName;
    this.clickAbout=false;
    this.clickEmail=false;
    this.clickPhone=false;
    this.clickPassword=false;
    this.clickFacebook=false;
    this.clickTwitter=false;
    this.clickLinkedin=false;
    this.clickLink=false;
  }

  onClickEmail(){
    this.clickEmail=!this.clickEmail;
    this.clickAbout=false;
    this.clickName=false;
    this.clickPhone=false;
    this.clickPassword=false;
    this.clickFacebook=false;
    this.clickTwitter=false;
    this.clickLinkedin=false;
    this.clickLink=false;
  }

  onClickPhone(){
    this.clickPhone=!this.clickPhone;
    this.clickAbout=false;
    this.clickName=false;
    this.clickEmail=false;
    this.clickPassword=false;
    this.clickFacebook=false;
    this.clickTwitter=false;
    this.clickLinkedin=false;
    this.clickLink=false;
  }

  onClickPassword(){
    this.clickPassword=!this.clickPassword;
    this.clickAbout=false;
    this.clickName=false;
    this.clickEmail=false;
    this.clickPhone=false;
    this.clickFacebook=false;
    this.clickTwitter=false;
    this.clickLinkedin=false;
    this.clickLink=false;
  }

  onClickFacebook(){
    this.clickFacebook=!this.clickFacebook;
    this.clickAbout=false;
    this.clickName=false;
    this.clickEmail=false;
    this.clickPhone=false;
    this.clickPassword=false;
    this.clickTwitter=false;
    this.clickLinkedin=false;
    this.clickLink=false;
  }

  onClickTwitter(){
    this.clickTwitter=!this.clickTwitter;
    this.clickAbout=false;
    this.clickName=false;
    this.clickEmail=false;
    this.clickPhone=false;
    this.clickPassword=false;
    this.clickFacebook=false;
    this.clickLinkedin=false;
    this.clickLink=false;
  }

  onClickLinkedin(){
    this.clickLinkedin=!this.clickLinkedin;
    this.clickAbout=false;
    this.clickName=false;
    this.clickEmail=false;
    this.clickPhone=false;
    this.clickPassword=false;
    this.clickFacebook=false;
    this.clickTwitter=false;
    this.clickLink=false;
  }

  onClickLink(){
    this.clickLink=!this.clickLink;
    this.clickAbout=false;
    this.clickName=false;
    this.clickEmail=false;
    this.clickPhone=false;
    this.clickPassword=false;
    this.clickFacebook=false;
    this.clickTwitter=false;
    this.clickLinkedin=false;
  }

  onSubmitAbout(){
    if (this.formAbout.valid) {
      try {
        this.serverCompanyService.request("PUT", "/company/edit/"+this.companyUser.company_id, this.formAbout.value).subscribe(()=>this.redirect(),()=>this.redirect());
      }
      catch (err) {}
    }
    else {}
  }

  onSubmitName(){
    if (this.formName.valid) {
      try {
        this.serverCompanyService.request("PUT", "/company/edit/"+this.companyUser.company_id, this.formName.value).subscribe(()=>this.redirect(),()=>this.redirect());
      }
      catch (err) {}
    }
    else {}
  }

  onSubmitEmail(){
    if (this.formEmail.valid) {
      try {
        this.serverCompanyService.request("PUT", "/company/edit/"+this.companyUser.company_id, this.formEmail.value).subscribe(()=>this.redirect(),()=>this.redirect());
      }
      catch (err) {}
    }
    else {}
  }

  onSubmitPhone(){
    if (this.formPhone.valid) {
      try {
        this.serverCompanyService.request("PUT", "/company/edit/"+this.companyUser.company_id, this.formPhone.value).subscribe(()=>this.redirect(),()=>this.redirect());
      }
      catch (err) {}
    }
    else {}
  }

  onSubmitPassword(){
    if (this.formPassword.valid) {
      try {
        this.serverCompanyService.request("PUT", "/company/edit/"+this.companyUser.company_id, this.formPassword.value).subscribe(()=>this.redirect(),()=>this.redirect());
      }
      catch (err) {}
    }
    else {}
  }

  onSubmitFacebook(){
    if (this.formFacebook.valid) {
      try {
        this.serverCompanyService.request("PUT", "/company/edit/"+this.companyUser.company_id, this.formFacebook.value).subscribe(()=>this.redirect(),()=>this.redirect());
      }
      catch (err) {}
    }
    else {}
  }

  onSubmitTwitter(){
    if (this.formTwitter.valid) {
      try {
        this.serverCompanyService.request("PUT", "/company/edit/"+this.companyUser.company_id, this.formTwitter.value).subscribe(()=>this.redirect(),()=>this.redirect());
      }
      catch (err) {}
    }
    else {}
  }

  onSubmitLinkedin(){
    if (this.formLinkedin.valid) {
      try {
        this.serverCompanyService.request("PUT", "/company/edit/"+this.companyUser.company_id, this.formLinkedin.value).subscribe(()=>this.redirect(),()=>this.redirect());
      }
      catch (err) {}
    }
    else {}
  }

  onSubmitLink(){
    if (this.formLink.valid) {
      try {
        this.serverCompanyService.request("PUT", "/company/edit/"+this.companyUser.company_id, this.formLink.value).subscribe(()=>this.redirect(),()=>this.redirect());
      }
      catch (err) {}
    }
    else {}
  }

  onDelete(id) {
    this.dialog.open(DeleteModalComponent, {
      data: {
        id: id,
        routeTarget: "/company/delete/",
        routeOrigin: "/",
        userType: 'companyUser',
      }
    })
  }

  redirect() {
    // TEMP SOLUTION TO REFRESH PAGE
    this.router.navigateByUrl('/redirect', {skipLocationChange: true}).then(() =>
    this.router.navigate(['/profil-company']));
  }

  selectedFile: File
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.onUploadLogo();
  }

  onUploadLogo() {
    const uploadData = new FormData();
    uploadData.append('logo', this.selectedFile, this.selectedFile.name);
    this.serverCompanyService.request("PUT", '/company/logo/'+this.companyUser.company_id, uploadData).subscribe(()=>this.redirect(),()=>this.redirect());
  }
}