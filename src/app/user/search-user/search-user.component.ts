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
    popupAnchor: [1, -40],
    iconAnchor: [12, 36],
    shadowUrl: '../../../assets/leaflet/images/marker-shadow.png',
  });
  private redIcon = L.icon({
    iconUrl: '../../../assets/leaflet/images/marker-icon-red.png',
    //pop up quand on clique, le met juste au dessus
    popupAnchor: [1, -40],
    iconAnchor: [12, 36],
    shadowUrl: '../../../assets/leaflet/images/marker-shadow.png',
  });
  private greenIcon = L.icon({
    iconUrl: '../../../assets/leaflet/images/marker-icon-green.png',
    //pop up quand on clique, le met juste au dessus
    popupAnchor: [1, -40],
    iconAnchor: [12, 36],
    shadowUrl: '../../../assets/leaflet/images/marker-shadow.png',
  });



  // Map Variables
  private map;
  private markers = [];
  private markerLayer;

  private filteredArray = [];

  private geolocationPosition;
  private geoFound=false;

  private distanceSliderDefaultValue = parseFloat(localStorage.getItem('distanceSlider')) ? parseFloat(localStorage.getItem('distanceSlider')) : 200 ;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  private offersWithKeyWords = this.route.snapshot.data.offerList;
  private search = '';
  private distanceSlider = this.distanceSliderDefaultValue;
  private distanceCircle;

    
  ngOnInit() {
    this.distanceSlider ? '' : this.distanceSlider = 200;
    for (let i = 0; i < this.route.snapshot.data.offerList.length; i++) {
      this.offersWithKeyWords[i].keyWords =
      this.route.snapshot.data.keyWordList[this.route.snapshot.data.offerList[i].keyWordOne_id - 1].name +
      "&"+
      this.route.snapshot.data.keyWordList[this.route.snapshot.data.offerList[i].keyWordTwo_id - 1].name +
      "&"+
      this.route.snapshot.data.keyWordList[this.route.snapshot.data.offerList[i].keyWordThree_id - 1].name;
    }
    this.filteredArray = this.offersWithKeyWords.filter((v) => v.keyWords.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
    this.filteredArray.forEach(x => (x.show=true));
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

  onDistanceChange(value) {
    this.distanceSlider = value;
    localStorage.setItem('distanceSlider',this.distanceSlider.toString());
    this.change();
  }


  change() {
    this.filteredArray = this.offersWithKeyWords.filter((v) => v.keyWords.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
    if (this.geoFound) {
      this.map.removeLayer(this.distanceCircle);
      this.addDistanceCircle();
      for (let i=0;i<this.filteredArray.length;i++) {
        this.filteredArray[i].distance = L.latLng(this.geolocationPosition.coords.latitude,this.geolocationPosition.coords.longitude).distanceTo(L.latLng(this.filteredArray[i].latitude,this.filteredArray[i].longitude));
        this.filteredArray[i].distance > this.distanceSlider*100 ? this.filteredArray[i].show=false : this.filteredArray[i].show=true;
      }
    }
    
    this.populateMarkers();
  }

  addDistanceCircle() {
    this.distanceCircle = L.circle([this.geolocationPosition.coords.latitude, this.geolocationPosition.coords.longitude], {
      color: '#60A4FF',
      fillColor: '#60A4FF',
      fillOpacity: 0.1,
      radius: this.distanceSlider*100
    }).addTo(this.map);
  }

  initMap() {
    let lat,lon;
    this.geoFound ? lat = this.geolocationPosition.coords.latitude : lat = 50.6342;
    this.geoFound ? lon = this.geolocationPosition.coords.longitude : lon = 3.02046;
    this.map = L.map('map').setView([lat, lon], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    if (this.geoFound) {
      L.marker([this.geolocationPosition.coords.latitude, this.geolocationPosition.coords.longitude], { icon: this.greenIcon }).bindPopup("Vous êtes ici !").addTo(this.map);
      this.addDistanceCircle();
      for (let i=0;i<this.filteredArray.length;i++) {
        this.filteredArray[i].distance = L.latLng(this.geolocationPosition.coords.latitude,this.geolocationPosition.coords.longitude).distanceTo(L.latLng(this.filteredArray[i].latitude,this.filteredArray[i].longitude));
        this.filteredArray[i].distance > this.distanceSlider*100 ? this.filteredArray[i].show=false : this.filteredArray[i].show=true;
      }
    }
    else {
      this.distanceSlider = 9999999999999;
    }
    this.populateMarkers();
  }

  //Poser les markers sur la map
  populateMarkers(): void {
    this.markers = [];
    this.markerLayer ? this.markerLayer.clearLayers() : '';
    for (let i = 0; i < this.filteredArray.length; i++) {
      if (this.filteredArray[i].show) {
        this.markers[i] = L.marker([this.filteredArray[i].latitude, this.filteredArray[i].longitude], { icon: this.defaultIcon }).bindPopup(
          '<div style="display:flex;flex-direction:row;justify-content:space-between;align-items:center;">'+
            '<h2>'+this.filteredArray[i].title+'</h2>'+
            '<img style="width:64px;height:64px;border-radius:100%;" src="http://pingjob.herokuapp.com/'+this.route.snapshot.data.companyList[this.filteredArray[i].company_id-1].logo+'" alt="logo">'+
          '</div>'+
          // '<hr style="width:100%";/>'+
          '<div style="margin-top:20px;margin-bottom:20px;">'+this.filteredArray[i].description+'</div>'+
          // '<hr style="width:100%";/>'+
          '<div style="display:flex;flex-direction:row;justify-content:space-around;align-items:center;">'+
            '<p style="background-color:#60A4FF;color:white;padding:4px;width:25%;text-align:center;border-radius:20px;">'+this.route.snapshot.data.keyWordList[this.filteredArray[i].keyWordOne_id-1].name+'</p>'+
            '<p style="background-color:#60A4FF;color:white;padding:4px;width:25%;text-align:center;border-radius:20px;">'+this.route.snapshot.data.keyWordList[this.filteredArray[i].keyWordTwo_id-1].name+'</p>'+
            '<p style="background-color:#60A4FF;color:white;padding:4px;width:25%;text-align:center;border-radius:20px;">'+this.route.snapshot.data.keyWordList[this.filteredArray[i].keyWordThree_id-1].name+'</p>'+
          '</div>'
        );
      }
      else {
        this.markers[i] = L.marker([this.filteredArray[i].latitude, this.filteredArray[i].longitude], { icon: this.redIcon }).bindPopup(
          '<div style="display:flex;flex-direction:row;justify-content:space-between;align-items:center;">'+
            '<h2>'+this.filteredArray[i].title+'</h2>'+
            '<img style="width:64px;height:64px;border-radius:100%;" src="http://pingjob.herokuapp.com/'+this.route.snapshot.data.companyList[this.filteredArray[i].company_id-1].logo+'" alt="logo">'+
          '</div>'+
          // '<hr style="width:100%";/>'+
          '<div style="margin-top:20px;margin-bottom:20px;">'+this.filteredArray[i].description+'</div>'+
          // '<hr style="width:100%";/>'+
          '<div style="display:flex;flex-direction:row;justify-content:space-around;align-items:center;">'+
            '<p style="background-color:#60A4FF;color:white;padding:4px;width:25%;text-align:center;border-radius:20px;">'+this.route.snapshot.data.keyWordList[this.filteredArray[i].keyWordOne_id-1].name+'</p>'+
            '<p style="background-color:#60A4FF;color:white;padding:4px;width:25%;text-align:center;border-radius:20px;">'+this.route.snapshot.data.keyWordList[this.filteredArray[i].keyWordTwo_id-1].name+'</p>'+
            '<p style="background-color:#60A4FF;color:white;padding:4px;width:25%;text-align:center;border-radius:20px;">'+this.route.snapshot.data.keyWordList[this.filteredArray[i].keyWordThree_id-1].name+'</p>'+
          '</div>'
        );
      }
    }
    this.markerLayer = L.layerGroup(this.markers);
    this.map.addLayer(this.markerLayer);
  }
}