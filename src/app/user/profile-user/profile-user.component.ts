import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {
  private formLastNameUser: FormGroup;
  private formFirstNameUser: FormGroup;
  private formLastNameUserCard: FormGroup;
  private formFirstNameUserCard: FormGroup;
  private formMailUser: FormGroup;
  private formFacebookUser: FormGroup;
  private formTwitterUser: FormGroup;
  private formLinkedinUser: FormGroup;
  private formDescriptionUser: FormGroup;
  private formKeywordsUserOne: FormGroup;
  private formKeywordsUserTwo: FormGroup;
  private formKeywordsUserThree: FormGroup;
  private click: boolean;

  constructor(
    private route: ActivatedRoute,
    private serverService: ServerService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formLastNameUser = this.fb.group({
      lastname: [this.route.snapshot.data.userDetails.lastName, Validators.required]
    });
    this.formFirstNameUser = this.fb.group({
      firstname: [this.route.snapshot.data.userDetails.firstName, Validators.required]
    });
    this.formMailUser = this.fb.group({
      email: [this.route.snapshot.data.userDetails.email, Validators.required]
    });
    this.formFacebookUser = this.fb.group({
      facebook: [this.route.snapshot.data.userDetails.facebook, Validators.required]
    });
    this.formTwitterUser = this.fb.group({
      twitter: [this.route.snapshot.data.userDetails.twitter, Validators.required]
    });
    this.formLinkedinUser = this.fb.group({
      linkedin: [this.route.snapshot.data.userDetails.linkedin, Validators.required]
    });
    this.formDescriptionUser = this.fb.group({
      description: [this.route.snapshot.data.userDetails.about, Validators.required]
    });
    this.formKeywordsUserOne = this.fb.group({
      keywordsone: [
        this.route.snapshot.data.userDetails.KeyWordOne.name,
     
        Validators.required]
    });
    this.formKeywordsUserTwo = this.fb.group({
      keywordstwo: [
        
        this.route.snapshot.data.userDetails.KeyWordTwo.name,
      
        Validators.required]
    });
    this.formKeywordsUserThree = this.fb.group({
      keywordsthree: [this.route.snapshot.data.userDetails.KeyWordThree.name, Validators.required]
    });
    this.formLastNameUserCard = this.fb.group({
      lastnamecard: [this.route.snapshot.data.userDetails.lastName, Validators.required]
    });
    this.formFirstNameUserCard = this.fb.group({
      firstnamecard: [this.route.snapshot.data.userDetails.firstName, Validators.required]
    });
    
  }
  onClick(){
    this.click=!this.click;
  }
}
