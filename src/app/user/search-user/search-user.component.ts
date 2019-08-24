import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
// import { UserService } from 'src/app/services/user.service';
// import { Company } from 'src/app/models/Company.model';
// import { ContractType } from 'src/app/models/ContractType.model';
// import { KeyWord } from 'src/app/models/KeyWord.model';
// import { Offer } from 'src/app/models/Offer.model';

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
    popupAnchor: [13,-2],
    shadowUrl: '../../../assets/leaflet/images/marker-shadow.png',
  });
  // Lists
  // private companyList: Array<Company>;
  // private contractTypeList: Array<ContractType>;
  // private keyWordList: Array<KeyWord>;
  // private offerList: Array<Offer>;  


  // Map Variables
  private map;
  private markers=[];
  private markerLayer;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
    ) { }

  ngOnInit() {
    // JSON.parse(localStorage.getItem('id')) !== null?this.userService.preloadUser():'';

    this.initMap();
  }

  ///////////////////////////////////////////////

  search='';
  

  folderObjs=[{
    name:'flo mdr',
    size:'24 ans'
  },{
    name:'wahiba <3',
    size:'36 ans'
  },{
    name:'alex^^',
    size:'33 ans'
  },{
    name:'natacha <3',
    size:'25 ans'
  }]

  ////////////////////////////////////////////////
  
  initMap() {
    this.map = L.map('map').setView([50.6342, 3.02046], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map)
    this.populateMarkers();
  }
  
  //Poser les markers sur la map
  populateMarkers(): void {
    this.markerLayer?this.markerLayer.clearLayers():'';
    for(let i=0;i<this.route.snapshot.data.offerList.length;i++){
      this.markers[i]=L.marker([this.route.snapshot.data.offerList[i].latitude,this.route.snapshot.data.offerList[i].longitude],{icon:this.defaultIcon}).bindPopup(this.route.snapshot.data.offerList[i].title+" : "+this.route.snapshot.data.offerList[i].description);
    }
    this.markerLayer=L.layerGroup(this.markers);
    this.map.addLayer(this.markerLayer);
  }
}