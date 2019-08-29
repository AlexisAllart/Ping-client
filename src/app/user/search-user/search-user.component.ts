import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

// Permet de manipuler leaflet
declare let L;

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {

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
  private markers = [];
  private markerLayer;

  private filteredArray = [];

  private geolocationPosition;
  private geoFound=false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  private offersWithKeyWords = this.route.snapshot.data.offerList;
  private search = '';

  ngOnInit() {
    for (let i = 0; i < this.route.snapshot.data.offerList.length; i++) {
      this.offersWithKeyWords[i].keyWords =
        this.route.snapshot.data.keyWordList[this.route.snapshot.data.offerList[i].keyWordOne_id - 1].name +
        this.route.snapshot.data.keyWordList[this.route.snapshot.data.offerList[i].keyWordTwo_id - 1].name +
        this.route.snapshot.data.keyWordList[this.route.snapshot.data.offerList[i].keyWordThree_id - 1].name
    }
    this.filteredArray = this.offersWithKeyWords.filter((v) => v.keyWords.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.geolocationPosition = position;
          this.geoFound=true;
          this.initMap();
        },
        error => {
          switch (error.code) {
            case 1:
              alert('ERREUR Localisation : Permission refusée');
              this.initMap();
              break;
            case 2:
              alert('ERREUR Localisation : Impossible de trouver votre position');
              this.initMap();
              break;
            case 3:
              alert('ERREUR Localisation : Aucune réponse du navigateur');
              this.initMap();
              break;
          }
        }
      );
    };
  }

  change() {
    this.filteredArray = this.offersWithKeyWords.filter((v) => v.keyWords.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
    this.populateMarkers();
  }

  initMap() {
    let lat,lon;
    this.geoFound ? lat = this.geolocationPosition.coords.latitude : lat = 50.6342;
    this.geoFound ? lon = this.geolocationPosition.coords.longitude : lon = 3.02046;
    this.map = L.map('map').setView([lat, lon], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.geoFound ? L.marker([this.geolocationPosition.coords.latitude, this.geolocationPosition.coords.longitude], { icon: this.redIcon }).bindPopup("Vous êtes ici !").addTo(this.map):'';
    this.populateMarkers();
  }

  //Poser les markers sur la map
  populateMarkers(): void {
    this.markers = [];
    this.markerLayer ? this.markerLayer.clearLayers() : '';
    for (let i = 0; i < this.filteredArray.length; i++) {
      this.markers[i] = L.marker([this.filteredArray[i].latitude, this.filteredArray[i].longitude], { icon: this.defaultIcon }).bindPopup(this.filteredArray[i].title + " : " + this.filteredArray[i].description);
    }
    this.markerLayer = L.layerGroup(this.markers);
    this.map.addLayer(this.markerLayer);
  }
}