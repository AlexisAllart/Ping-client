import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AuthCompanyService } from 'src/app/services/authCompany.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private authCompanyService: AuthCompanyService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onClick() {
    this.authService.logoutNoRedirect();
    this.authCompanyService.logoutNoRedirect();
    this.router.navigate(['/search-user']);
  }
}
