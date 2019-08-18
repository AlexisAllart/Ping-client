import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PingFront';

  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
}
