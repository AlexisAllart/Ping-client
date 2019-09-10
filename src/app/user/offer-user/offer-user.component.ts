import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';
import { HttpClient } from '@angular/common/http';
import { OfferDetails } from 'src/app/models/OfferDetails.model';


// Permet de manipuler leaflet
declare let L;

@Component({
  selector: 'app-offer-user',
  templateUrl: './offer-user.component.html',
  styleUrls: ['./offer-user.component.scss']
})
export class OfferUserComponent implements OnInit {

  // Icons 
  private defaultIcon = L.icon({
    iconUrl: '../../../assets/leaflet/images/marker-icon.png',
    //pop up quand on clique, le met juste au dessus
    popupAnchor: [13, -2],
    shadowUrl: '../../../assets/leaflet/images/marker-shadow.png',
  });

  // Map Variables
  private map;
  private offer: OfferDetails;
  private ready: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private serverService: ServerService,
    private router: Router,
    private http: HttpClient,
    

  ) {
      
   }

  ngOnInit() {
    this.http.get<OfferDetails>('http://pingjob.herokuapp.com/offer/details/'+this.route.snapshot.paramMap.get('id')).subscribe(res => {
      this.offer=res;
      this.initMap();
      this.ready=true;
    });
  }

  initMap() {
    this.map = L.map('map').setView([this.offer.latitude, this.offer.longitude], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    L.marker([this.offer.latitude, this.offer.longitude], { icon: this.defaultIcon }).addTo(this.map);
  }

  onSubmit() {
    let company_id = this.offer.company_id;
    let offer_id = this.offer.id;
    let user_id = JSON.parse(localStorage.getItem('id'));
    let data = {
      company_id: company_id,
      offer_id: offer_id,
      user_id: user_id
    };
    this.serverService.request("POST", "/ping/create", data).subscribe();
    this.router.navigate(['/search-user']);
  }
 
}