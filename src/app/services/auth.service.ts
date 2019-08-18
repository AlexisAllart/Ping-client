import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ServerService } from './server.service';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private token: string;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router, private server: ServerService) {
    // On place le contenu de localStorage.getItem('user') (= un token déjà existant) dans "userData"
    const userData = localStorage.getItem('user');

    // Si un token est déjà présent...
    if (userData) {
      // On place dans "user" un objet JSON avec le contenu de userData
      const user = JSON.parse(userData);
      // On sauvegarde le token lui-même dans la variable locale "this.token"
      this.token = user.token;
      // On exécute la method de server.service avec les paramètres suivants :
      this.server.setLoggedIn(true, this.token);
      this.loggedIn.next(true);
      // Redirection vers le dashboard-user
      this.router.navigateByUrl('/dashboard-user');
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
            this.token = response;
            this.server.setLoggedIn(true, this.token);
            this.loggedIn.next(true);
            const userData = {
              token: this.token
            };
            localStorage.setItem('user', JSON.stringify(userData));
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
