import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ServerService } from './server.service';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private token: string;
  private id: number;
  public loginError: boolean = false;
  public loginAccepted: boolean = false;
  public loginAttempt: boolean = false;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router, private server: ServerService) {
    const userData = localStorage.getItem('token');
    
    if (userData) {
      const user = JSON.parse(userData);
      this.token = user.token;
      this.server.setLoggedIn(true, this.token);
      this.loggedIn.next(true);
    }
  }

  login(user) {
    this.loginAttempt = true;
    this.loginAccepted = false;
    this.loginError = false;
    if (user.email !== '' && user.password !== '') {
      return this.server.request('POST', '/user/login', {
        email: user.email,
        password: user.password
      })
      .subscribe((response: any) => {
        if (response !== undefined) {
          this.loginError = false;
          this.id = response.id;
          this.token = response.token;
          this.server.setLoggedIn(true, this.token);
          this.loggedIn.next(true);
          const userData = {
            token: this.token
          };
          const userId = {
            id: this.id
          }
          localStorage.setItem('token', JSON.stringify(userData));
          localStorage.setItem('id', JSON.stringify(userId));
          this.loginAttempt = false;
          this.loginAccepted = true;
          this.loginError = false;
        }
      },
      (error) => {
        this.loginAttempt = false;
        this.loginAccepted = false;
        this.loginError = true;
      },
      () => {
        this.router.navigateByUrl('/dashboard-user');
      }
      );
    }
  }

  logout() {
    this.logoutNoRedirect();
    this.router.navigate(['/']);
  }

  logoutNoRedirect() {
    this.server.setLoggedIn(false);
    delete this.token;
    this.loggedIn.next(false);
    localStorage.clear();
  }
}
