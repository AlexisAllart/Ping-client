import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  private form: FormGroup;
  public signUpInvalid: boolean;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private serverService: ServerService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.email],
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.signUpInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        this.serverService.request("POST", "/company/create", this.form.value).subscribe();
      }
      catch (err) {
        this.signUpInvalid = true;
      }
    }
    else {
      this.formSubmitAttempt = true;
    }
  }
}
