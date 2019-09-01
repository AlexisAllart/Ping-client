import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserDetailsService } from '../../services/userDetails.service';
import{User} from '../../models/User.model';

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
/**************************** Registration ****************************/
formInscription: FormGroup;
  
  
  ngOnInitInscription() {
    this.formInscription = this.fb.group({
      firstName:[''],
      lastName:[''],
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

//   model = [new User()];
  
//   onSubmitInscription(value: any){
//     this.model.unshift(
//       new User(
//         value.firstName,
//         value.lastName,
//         value.email,
//         value.password,
//     )
//     ) 
// }
}
