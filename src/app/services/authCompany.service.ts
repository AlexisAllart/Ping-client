import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ServerCompanyService } from './serverCompany.service';

@Injectable()
export class AuthCompanyService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private token: string;
  private id: number;
  private loginError: boolean = false;
  private loginAccepted: boolean = false;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router, private serverCompany: ServerCompanyService) {
    const userData = localStorage.getItem('companyUserToken');
    
    if (userData) {
      const user = JSON.parse(userData);
      this.token = user.token;
      this.serverCompany.setLoggedIn(true, this.token);
      this.loggedIn.next(true);
    }
    }

    login(user) {
      if (user.email !== '' && user.password !== '') {
        return this.serverCompany.request('POST', '/companyUser/login', {
          email: user.email,
          password: user.password
        })
        .subscribe((response: any) => {
          if (response !== undefined) {
            this.loginError = false;
            this.id = response.id;
            this.token = response.token;
            this.serverCompany.setLoggedIn(true, this.token);
            this.loggedIn.next(true);
            const userData = {
              token: this.token
            };
            const userId = {
              id: this.id
            }
            localStorage.setItem('companyUserToken', JSON.stringify(userData));
            localStorage.setItem('companyUserId', JSON.stringify(userId));
            this.loginAccepted = true;
          }
        },
        (error) => {
          this.loginAccepted = false;
          this.loginError = true;
        },
        () => {
          this.router.navigateByUrl('/ping');
          this.loginAccepted = false;
        }
        );
      }
    }

    logout() {
      this.logoutNoRedirect();
      this.router.navigate(['/']);
    }

    logoutNoRedirect() {
      this.serverCompany.setLoggedIn(false);
      delete this.token;
      this.loggedIn.next(false);
      localStorage.clear();
    }
}
