import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private commonService: CommonService, private publicService: PublicService) { }

  ngOnInit() {
    this.commonService.checkAll();
    this.publicService.checkAll();
    // DEBUG MESSAGE
    console.log("Rappel : on récupère l'id et le token de l'utilisateur de la manière suivante :")
    console.log("JSON.parse(localStorage.getItem('id')).id");
    console.log("JSON.parse(localStorage.getItem('token')).token");
    // END DEBUG MESSAGE
  }
}
