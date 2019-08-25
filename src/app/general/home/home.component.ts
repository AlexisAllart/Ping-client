import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // DEBUG MESSAGE
    // console.log("Rappel : on récupère l'id et le token de l'utilisateur de la manière suivante :");
    // console.log("JSON.parse(localStorage.getItem('id')).id");
    // console.log("JSON.parse(localStorage.getItem('token')).token");
    // console.log("On récupère l'id et le token du companyUser de la manière suivante :");
    // console.log("JSON.parse(localStorage.getItem('companyUserId')).id");
    // console.log("JSON.parse(localStorage.getItem('companyUserToken')).token");
    // END DEBUG MESSAGE
  }
}
