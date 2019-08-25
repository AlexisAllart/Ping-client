import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.scss']
})
export class ProfileCompanyComponent implements OnInit {


  votreNom= "Votre nom";
  votreMail= "Votre mail"

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

}
