import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-identification-user',
  templateUrl: './identification-user.component.html',
  styleUrls: ['./identification-user.component.scss']
})
export class IdentificationUserComponent implements OnInit {
  private form: FormGroup;
  private formSignUp: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  public signUpInvalid: boolean;
  private formSubmitSignUpAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private serverService: ServerService
  ) { }

  ngOnInit() {
    this.authService.logoutNoRedirect();
    this.authService.loginAccepted = false;
    this.authService.loginAttempt = false;
    this.authService.loginError = false;
    this.form = this.fb.group({
      email: ['charlene.smith@gmail.com', Validators.email],
      password: ['1234', Validators.required]
    });
    this.formSignUp = this.fb.group({
      email: ['', Validators.email],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        this.authService.login(this.form.value);
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
        this.serverService.request("POST", "/user/create", this.formSignUp.value).subscribe(
          () => {
            let loginData = {
              email: this.formSignUp.value.email,
              password: this.formSignUp.value.password
            };
            try {
              this.authService.login(loginData);
            }
            catch(err) {}
          }
        );
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
