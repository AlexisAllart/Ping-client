import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
import { PublicService } from 'src/app/services/public.service';
import { Company } from 'src/app/models/Company.model';
import { ContractType } from 'src/app/models/ContractType.model';
import { KeyWord } from 'src/app/models/KeyWord.model';
import { Offer } from 'src/app/models/Offer.model';

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
  private companyList: Array<Company>;
  private contractTypeList: Array<ContractType>;
  private keyWordList: Array<KeyWord>;
  private offerList: Array<Offer>;  


  // Map Variables
  private map;
  private markers=[];
  private markerLayer;

  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private publicService: PublicService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.commonService.checkAll();
    this.publicService.checkAll();
    JSON.parse(localStorage.getItem('id')) !== null?this.userService.checkAll():'';
    this.contractTypeList = this.commonService.getContractTypeList();
    this.companyList = this.publicService.getCompanyList();
    this.keyWordList = this.publicService.getKeyWordList();
    this.offerList = this.publicService.getOfferList();
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
    for(let i=0;i<this.publicService.getOfferList().length;i++){
      this.markers[i]=L.marker([this.publicService.getOfferList()[i].latitude,this.publicService.getOfferList()[i].longitude],{icon:this.defaultIcon}).bindPopup(this.publicService.getOfferList()[i].title+" : "+this.publicService.getOfferList()[i].description);
    }
    this.markerLayer=L.layerGroup(this.markers);
    this.map.addLayer(this.markerLayer);
  }
}