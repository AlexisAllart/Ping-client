import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
  private redIcon = L.icon({
    iconUrl: '../../../assets/leaflet/images/marker-icon-red.png',
    //pop up quand on clique, le met juste au dessus
    popupAnchor: [13, -2],
    shadowUrl: '../../../assets/leaflet/images/marker-shadow.png',
  });

  // Map Variables
  private map;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    let lat,lon;
    lat = this.route.snapshot.data.offerList[+this.route.snapshot.paramMap.get('id')-1].latitude;
    lon = this.route.snapshot.data.offerList[+this.route.snapshot.paramMap.get('id')-1].longitude;
    this.map = L.map('map').setView([lat, lon], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    L.marker([lat, lon], { icon: this.defaultIcon }).addTo(this.map);
  }
}