import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AuthCompanyService } from './services/authCompany.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PingFront';

  constructor(
    private authService: AuthService,
    private authCompanyService: AuthCompanyService,
    ) {}

  onLogout() {
    this.authService.logout();
    this.authCompanyService.logout();
  }
}
