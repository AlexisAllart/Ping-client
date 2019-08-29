import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-identification-user',
  templateUrl: './identification-user.component.html',
  styleUrls: ['./identification-user.component.scss']
})
export class IdentificationUserComponent implements OnInit {
  form: FormGroup;
  formInscription: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
    // this.formInscription = this.fb.group({
    //   email: ['', Validators.email],
    //   password: ['', Validators.required]
    // });
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
}
