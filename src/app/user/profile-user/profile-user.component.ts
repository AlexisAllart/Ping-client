import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DeleteModalComponent } from 'src/app/deleteModal/deleteModal.component';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {

  private formAbout: FormGroup;
  private formKeywords: FormGroup;
  private formFacebook: FormGroup;
  private formTwitter: FormGroup;
  private formLinkedin: FormGroup;
  private formLastName: FormGroup;
  private formFirstName: FormGroup;
  private formEmail: FormGroup;

  private clickAbout: boolean;
  private clickFacebook: boolean;
  private clickTwitter: boolean;
  private clickLinkedin: boolean;
  private clickLastName: boolean;
  private clickFirstName: boolean;
  private clickEmail: boolean;
  private clickKeywords: boolean;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serverService: ServerService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.formLastName = this.fb.group({
      lastName: [this.route.snapshot.data.userDetails.lastName, Validators.required]
    });
    this.formFirstName = this.fb.group({
      firstName: [this.route.snapshot.data.userDetails.firstName, Validators.required]
    });
    this.formEmail = this.fb.group({
      email: [this.route.snapshot.data.userDetails.email, Validators.required]
    });
    this.formFacebook = this.fb.group({
      facebook: [this.route.snapshot.data.userDetails.facebook, Validators.required]
    });
    this.formTwitter = this.fb.group({
      twitter: [this.route.snapshot.data.userDetails.twitter, Validators.required]
    });
    this.formLinkedin = this.fb.group({
      linkedin: [this.route.snapshot.data.userDetails.linkedin, Validators.required]
    });
    this.formAbout = this.fb.group({
      about: [this.route.snapshot.data.userDetails.about, Validators.required]
    });
    this.formKeywords = this.fb.group({
      keyWordOne_id: [this.route.snapshot.data.userDetails.KeyWordOne.name, Validators.required],
      keyWordTwo_id: [this.route.snapshot.data.userDetails.KeyWordTwo.name, Validators.required],
      keyWordThree_id: [this.route.snapshot.data.userDetails.KeyWordThree.name, Validators.required]
    });
  }

  onClickAbout() {
    this.clickAbout = !this.clickAbout;
    this.clickFacebook = false;
    this.clickEmail = false;
    this.clickTwitter = false;
    this.clickLinkedin = false;
    this.clickFirstName = false;
    this.clickLastName = false;
    this.clickKeywords = false;
  }

  onClickFacebook() {
    this.clickAbout = false;
    this.clickFacebook = !this.clickFacebook;
    this.clickEmail = false;
    this.clickTwitter = false;
    this.clickLinkedin = false;
    this.clickFirstName = false;
    this.clickLastName = false;
    this.clickKeywords = false;
  }

  onClickTwitter() {
    this.clickAbout = false;
    this.clickFacebook = false;
    this.clickEmail = false;
    this.clickTwitter = !this.clickTwitter;
    this.clickLinkedin = false;
    this.clickFirstName = false;
    this.clickLastName = false;
    this.clickKeywords = false;
  }

  onClickLinkedin() {
    this.clickAbout = false;
    this.clickFacebook = false;
    this.clickEmail = false;
    this.clickTwitter = false;
    this.clickLinkedin = !this.clickLinkedin;
    this.clickFirstName = false;
    this.clickLastName = false;
    this.clickKeywords = false;
  }

  onClickEmail() {
    this.clickAbout = false;
    this.clickFacebook = false;
    this.clickEmail = !this.clickEmail;
    this.clickTwitter = false;
    this.clickLinkedin = false;
    this.clickFirstName = false;
    this.clickLastName = false;
    this.clickKeywords = false;
  }

  onClickFirstName() {
    this.clickAbout = false;
    this.clickFacebook = false;
    this.clickEmail = false;
    this.clickTwitter = false;
    this.clickLinkedin = false;
    this.clickFirstName = !this.clickFirstName;
    this.clickLastName = false;
    this.clickKeywords = false;
  }

  onClickLastName() {
    this.clickAbout = false;
    this.clickFacebook = false;
    this.clickEmail = false;
    this.clickTwitter = false;
    this.clickLinkedin = false;
    this.clickFirstName = false;
    this.clickLastName = !this.clickLastName;
    this.clickKeywords = false;
  }

  onClickKeywords(){
    this.clickAbout = false;
    this.clickFacebook = false;
    this.clickEmail = false;
    this.clickTwitter = false;
    this.clickLinkedin = false;
    this.clickFirstName = false;
    this.clickLastName = false;
    this.clickKeywords = !this.clickKeywords;
  }

  onSubmitAbout() {
    if (this.formAbout.valid) {
      try {
        this.serverService.request("PUT", "/user/edit/" + JSON.parse(localStorage.getItem('id')).id, this.formAbout.value).subscribe(() => this.redirect(),() => this.redirect());
      }
      catch (err) { }
    }
    else { }
  }

  onSubmitFacebook() {
    if (this.formFacebook.valid) {
      try {
        this.serverService.request("PUT", "/user/edit/" + JSON.parse(localStorage.getItem('id')).id, this.formFacebook.value).subscribe(() => this.redirect(),() => this.redirect());
      }
      catch (err) { }
    }
    else { }
  }

  onSubmitTwitter() {
    if (this.formTwitter.valid) {
      try {
        this.serverService.request("PUT", "/user/edit/" + JSON.parse(localStorage.getItem('id')).id, this.formTwitter.value).subscribe(() => this.redirect(),() => this.redirect());
      }
      catch (err) { }
    }
    else { }
  }

  onSubmitLinkedin() {
    if (this.formLinkedin.valid) {
      try {
        this.serverService.request("PUT", "/user/edit/" + JSON.parse(localStorage.getItem('id')).id, this.formLinkedin.value).subscribe(() => this.redirect(),() => this.redirect());
      }
      catch (err) { }
    }
    else { }
  }

  onSubmitEmail() {
    if (this.formEmail.valid) {
      try {
        this.serverService.request("PUT", "/user/edit/" + JSON.parse(localStorage.getItem('id')).id, this.formEmail.value).subscribe(() => this.redirect(),() => this.redirect());
      }
      catch (err) { }
    }
    else { }
  }

  onSubmitFirstName() {
    if (this.formFirstName.valid) {
      try {
        this.serverService.request("PUT", "/user/edit/" + JSON.parse(localStorage.getItem('id')).id, this.formFirstName.value).subscribe(() => this.redirect(),() => this.redirect());
      }
      catch (err) { }
    }
    else { }
  }

  onSubmitLastName() {
    if (this.formLastName.valid) {
      try {
        this.serverService.request("PUT", "/user/edit/" + JSON.parse(localStorage.getItem('id')).id, this.formLastName.value).subscribe(() => this.redirect(),() => this.redirect());
      }
      catch (err) { }
    }
    else { }
  }

  onSubmitKeywords() {
    if (this.formKeywords.valid) {
      try {
        this.serverService.request("PUT", "/user/edit/" + JSON.parse(localStorage.getItem('id')).id, this.formKeywords.value).subscribe(() => this.redirect(),() => this.redirect());
      }
      catch (err) { }
    }
    else { }
  }

  onDelete(id) {
    this.dialog.open(DeleteModalComponent, {
      data: {
        id: id,
        routeTarget: "/user/delete/",
        routeOrigin: "/",
        userType: 'user',
      }
    })
  }

  selectedFilePicture: File
  onFileChangedPicture(event) {
    this.selectedFilePicture = event.target.files[0];
    this.onUploadPicture();
  }
  
  onUploadPicture() {
    const uploadData = new FormData();
    uploadData.append('picture', this.selectedFilePicture, this.selectedFilePicture.name);
    this.serverService.request("PUT", '/user/picture/' + JSON.parse(localStorage.getItem('id')).id, uploadData).subscribe(() => this.redirect(),() => this.redirect());
  }
  
  selectedFileCV: File
  onFileChangedCV(event) {
    this.selectedFileCV = event.target.files[0];
    this.onUploadCV();
  }
  
  onUploadCV() {
    const uploadData = new FormData();
    uploadData.append('cv', this.selectedFileCV, this.selectedFileCV.name);
    this.serverService.request("PUT", '/user/cv/' + JSON.parse(localStorage.getItem('id')).id, uploadData).subscribe(() => this.redirect(),() => this.redirect());
  }

  redirect() {
    // TEMP SOLUTION TO REFRESH PAGE
    this.router.navigateByUrl('/redirect', { skipLocationChange: true }).then(() =>
    this.router.navigate(['/profile-user']));
  }
}
