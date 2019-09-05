import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthCompanyService } from '../../services/authCompany.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  private form: FormGroup;
  private formSignUp: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  public signUpInvalid: boolean;
  private formSubmitSignUpAttempt: boolean;
  

  constructor(
    private fb: FormBuilder,
    private authCompanyService: AuthCompanyService,
    private serverService: ServerService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['geraldine.kouma@gmail.com', Validators.email],
      password: ['1234', Validators.required]
    });
    this.formSignUp = this.fb.group({
      email: ['', Validators.email],
      name: ['', Validators.required],
      password: ['', Validators.required],
      companyEmail: ['', Validators.required],
      companyPassword: ['', Validators.required]
    });
  }
  

  onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        this.authCompanyService.login(this.form.value);
      }
      catch (err) {
        this.loginInvalid = true;
      }
    }
    else {
      this.formSubmitAttempt = true;
    }
  }

  onSubmitSignUp() {
    if (this.formSignUp.valid) {
      try {
        this.serverService.request("POST", "/companyUser/create", this.formSignUp.value).subscribe();
      }
      catch (err) {
        this.signUpInvalid = true;
      }
    }
    else {
      this.formSubmitSignUpAttempt = true;
    }
  }
}
