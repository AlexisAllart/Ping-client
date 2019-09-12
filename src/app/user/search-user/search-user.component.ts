import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
// Permet de manipuler leaflet
declare let L;

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss'],
  animations: [
    trigger('contactsAnimation', [
      state('active', style({
        opacity: '1'
      })),
      transition('void => *', [
        style({ transform: 'translateY(-100px)', opacity: '0' }),
        animate('1000ms ease-in-out')
      ])
    ])
  ]
})
export class SearchUserComponent implements OnInit {

  // Icons 
  private defaultIcon = L.icon({
    iconUrl: '../../../assets/leaflet/images/marker-icon.png',
    popupAnchor: [1, -40],
    iconAnchor: [12, 36],
    shadowUrl: '../../../assets/leaflet/images/marker-shadow.png',
  });
  private redIcon = L.icon({
    iconUrl: '../../../assets/leaflet/images/marker-icon-red.png',
    popupAnchor: [1, -40],
    iconAnchor: [12, 36],
    shadowUrl: '../../../assets/leaflet/images/marker-shadow.png',
  });
  private greenIcon = L.icon({
    iconUrl: '../../../assets/leaflet/images/marker-icon-green.png',
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

  private contractFilter = [];
  private contractBtn = [];

  private distanceSliderDefaultValue = parseFloat(localStorage.getItem('distanceSlider')) ? parseFloat(localStorage.getItem('distanceSlider')) : 200 ;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  private offersWithKeyWords = this.route.snapshot.data.offerList.sort(((a,b) => (a.id < b.id) ? 1 : -1));
  private finalOfferList = [] ;
  private search = '';
  private distanceSlider = this.distanceSliderDefaultValue;
  private distanceCircle;

    
  ngOnInit() {
    for (let i = 0; i < this.route.snapshot.data.contractTypeList.length; i++) {
      this.contractBtn[i]="type";
    }
    this.distanceSlider ? '' : this.distanceSlider = 200;
    for (let i = 0; i < this.route.snapshot.data.offerList.length; i++) {
      this.offersWithKeyWords[i].keyWords =
      this.route.snapshot.data.offerList[i].KeyWordOne.name +
      "&"+
      this.route.snapshot.data.offerList[i].KeyWordTwo.name +
      "&"+
      this.route.snapshot.data.offerList[i].KeyWordThree.name+
      "&"+
      this.route.snapshot.data.offerList[i].title;
    }
    this.finalOfferList = this.offersWithKeyWords;
    for (let i = 0; i < this.offersWithKeyWords.length; i++) {
      this.finalOfferList[i].contractType = this.offersWithKeyWords[i].ContractType.name;
    }
    if (this.contractFilter === undefined || this.contractFilter.length == 0) {
      this.filteredArray = this.finalOfferList;
    }
    else {
      this.contractFilter.forEach(contract => (
        this.finalOfferList.forEach( offer =>
          offer.contractType == contract ? this.filteredArray.push(offer):'')
      ));
    }
    this.filteredArray = this.filteredArray.filter((v) => v.keyWords.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
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

  addContractTypeFilter(str,i) {
    let found=false;
    for (let j=0;j<this.contractFilter.length;j++) {
      if (str==this.contractFilter[j]) {
        this.contractFilter.splice(j,1);
        found=true;
        this.contractBtn[i-1] = "type";
        break;
      }
    }
    if (!found) {
      this.contractFilter.push(str);
      this.contractBtn[i-1] = "type-activated";
    }
    this.change();
  }

  change() {
    this.filteredArray = [];
    if (this.contractFilter === undefined || this.contractFilter.length == 0) {
      this.filteredArray = this.finalOfferList;
    }
    else {
    this.contractFilter.forEach(contract => (
      this.finalOfferList.forEach( offer => (
        offer.contractType == contract ? this.filteredArray.push(offer):'')
    )));
    }
    this.filteredArray = this.filteredArray.filter((v) => v.keyWords.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
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
            '<img style="width:64px;height:64px;" src="http://pingjob.herokuapp.com/'+this.filteredArray[i].CompanyUser.Company.logo+'" alt="logo">'+
          '</div>'+
          // '<hr style="width:100%";/>'+
          '<div style="margin-top:20px;margin-bottom:20px;">'+this.filteredArray[i].description+'</div>'+
          // '<hr style="width:100%";/>'+
          '<div style="display:flex;flex-direction:row;justify-content:space-around;align-items:center;">'+
            '<p style="background-color:#60A4FF;color:white;padding:4px;width:25%;text-align:center;border-radius:20px;">'+this.filteredArray[i].KeyWordOne.name+'</p>'+
            '<p style="background-color:#60A4FF;color:white;padding:4px;width:25%;text-align:center;border-radius:20px;">'+this.filteredArray[i].KeyWordTwo.name+'</p>'+
            '<p style="background-color:#60A4FF;color:white;padding:4px;width:25%;text-align:center;border-radius:20px;">'+this.filteredArray[i].KeyWordThree.name+'</p>'+
          '</div>'
        );
      }
      else {
        this.markers[i] = L.marker([this.filteredArray[i].latitude, this.filteredArray[i].longitude], { icon: this.redIcon }).bindPopup(
          '<div style="display:flex;flex-direction:row;justify-content:space-between;align-items:center;">'+
            '<h2>'+this.filteredArray[i].title+'</h2>'+
            '<img style="width:64px;height:64px;" src="http://pingjob.herokuapp.com/'+this.filteredArray[i].CompanyUser.Company.logo+'" alt="logo">'+
          '</div>'+
          // '<hr style="width:100%";/>'+
          '<div style="margin-top:20px;margin-bottom:20px;">'+this.filteredArray[i].description+'</div>'+
          // '<hr style="width:100%";/>'+
          '<div style="display:flex;flex-direction:row;justify-content:space-around;align-items:center;">'+
            '<p style="background-color:#60A4FF;color:white;padding:4px;width:25%;text-align:center;border-radius:20px;">'+this.filteredArray[i].KeyWordOne.name+'</p>'+
            '<p style="background-color:#60A4FF;color:white;padding:4px;width:25%;text-align:center;border-radius:20px;">'+this.filteredArray[i].KeyWordTwo.name+'</p>'+
            '<p style="background-color:#60A4FF;color:white;padding:4px;width:25%;text-align:center;border-radius:20px;">'+this.filteredArray[i].KeyWordThree.name+'</p>'+
          '</div>'
        );
      }
    }
    this.markerLayer = L.layerGroup(this.markers);
    this.map.addLayer(this.markerLayer);
  }
}