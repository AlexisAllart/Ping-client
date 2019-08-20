import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Offer } from '../../models/Offer.model';
import { Company } from '../../models/Company.model';
import { ContractType } from '../../models/ContractType.model';
import { KeyWord } from '../../models/KeyWord.model';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ServerService } from 'src/app/services/server.service';
import { User } from '../../models/User.model';

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
  // Tableau d'offer (typage) - déclaration des listes !
  offerList: Array<Offer> = {} as Array<Offer>;
  companyList: Array<Company> = {} as Array<Company>;
  contractTypeList: Array<ContractType> = {} as Array<ContractType>;
  keyWordList: Array<KeyWord> = {} as Array<KeyWord>;
  
  // Variables
  private offerListLoaded=false;
  private companyListLoaded=false;
  private contractTypeListLoaded=false;
  private keyWordListLoaded=false;
  private map;
  private markers=[];
  private markerLayer;
  private user: User;
  // Variables récupérées au moment du login
  private userId = JSON.parse(localStorage.getItem('id')).id;
  private userToken = JSON.parse(localStorage.getItem('user')).token;

  constructor(private http:HttpClient, private authService: AuthService, private server: ServerService) { }

  ngOnInit() {
    this.initMap();
    this.getUserInfo();
    this.getAll()
    interval(300000)
    .subscribe(
      () => this.getAll()
    );
  }

  getUserInfo() {
    this.server.request('GET', '/user/details/'+this.userId).subscribe((user: User) => {
      if (user) {
        this.user = user;
        console.log("User Info from server :");
        console.log(this.user);
      }
    });
  }
  
  initMap() {
    this.map = L.map('map').setView([50.6342, 3.02046], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }
  
  getAll() {
    this.getOfferList();
    this.getCompanyList();
    this.getContractTypeList();
    this.getKeyWordList();
  }

  //Poser les markers sur la map
  populateMarkers(): void {
    this.markerLayer?this.markerLayer.clearLayers():'';
    for(let i=0;i<this.offerList.length;i++){
      this.markers[i]=L.marker([this.offerList[i].latitude,this.offerList[i].longitude],{icon:this.defaultIcon}).bindPopup(this.offerList[i].title+" : "+this.offerList[i].description);
    }
    this.markerLayer=L.layerGroup(this.markers);
    this.map.addLayer(this.markerLayer);
  }

  getOfferList(): void {
    this.http.get<Array<Offer>>('http://pingjob.herokuapp.com/offer/list')
      .pipe(map(data => data))
      .subscribe(
        (offerList:Array<Offer>) => {
          this.offerList=offerList;
          this.offerListLoaded = true;
          this.populateMarkers();
        },
        err => {
          console.log(err);
        }
      );
  }

  getCompanyList(): void {
    this.http.get<Array<Company>>('http://pingjob.herokuapp.com/company/list')
      .pipe(map(data => data))
      .subscribe(
        (companyList:Array<Company>) => {
          this.companyList=companyList;
          this.companyListLoaded = true;
        },
        err => {
          console.log(err);
        }
      );
  }

  getContractTypeList(): void {
    this.http.get<Array<ContractType>>('http://pingjob.herokuapp.com/contractType/list')
      .pipe(map(data => data))
      .subscribe(
        (contractTypeList:Array<ContractType>) => {
          this.contractTypeList=contractTypeList;
          this.contractTypeListLoaded = true;
        },
        err => {
          console.log(err);
        }
      );
  }

  getKeyWordList(): void {
    this.http.get<Array<KeyWord>>('http://pingjob.herokuapp.com/keyWord/list')
      .pipe(map(data => data))
      .subscribe(
        (keyWordList:Array<KeyWord>) => {
          this.keyWordList=keyWordList;
          this.keyWordListLoaded = true;
        },
        err => {
          console.log(err);
        }
      );
  }
}