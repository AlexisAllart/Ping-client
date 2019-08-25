import { Component, OnInit } from '@angular/core';
import { AuthCompanyService } from 'src/app/services/authCompany.service';

@Component({
  selector: 'app-navbar-company',
  templateUrl: './navbar-company.component.html',
  styleUrls: ['./navbar-company.component.scss']
})
export class NavbarCompanyComponent implements OnInit {

  constructor(private authCompanyService: AuthCompanyService) { }

  ngOnInit() {
  }

  onLogout() {
    this.authCompanyService.logout()
  }
}
