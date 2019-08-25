import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ServerService } from './server.service';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private token: string;
  private id: number;

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
      // this.router.navigateByUrl('/dashboard-user');
    }
   }

   login(user) {
      if (user.email !== '' && user.password !== '') {
        return this.server.request('POST', '/user/login', {
          email: user.email,
          password: user.password
        })
        .subscribe((response: any) => {
          if (response !== undefined) {
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
            this.router.navigateByUrl('/dashboard-user');
          }
        });
      }
   }

   logout() {
     this.server.setLoggedIn(false);
     delete this.token;
     this.loggedIn.next(false);
     localStorage.clear();
     this.router.navigate(['/']);
   }
}
