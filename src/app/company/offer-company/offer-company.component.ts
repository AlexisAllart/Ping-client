import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyUser } from 'src/app/models/CompanyUser.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServerCompanyService } from 'src/app/services/serverCompany.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteModalComponent } from 'src/app/deleteModal/deleteModal.component';

declare let L;

@Component({
  selector: 'app-offer-company',
  templateUrl: './offer-company.component.html',
  styleUrls: ['./offer-company.component.scss'],
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
export class OfferCompanyComponent implements OnInit {

  // Icons 
  private defaultIcon = L.icon({
    iconUrl: '../../../assets/leaflet/images/marker-icon.png',
    popupAnchor: [1, -40],
    iconAnchor: [12, 36],
    shadowUrl: '../../../assets/leaflet/images/marker-shadow.png',
  });
  private map;
  private markers = [];
  private markerLayer;

  private latitude;
  private longitude;


  private companyUser: CompanyUser;
  private companyUserId = JSON.parse(localStorage.getItem('companyUserId')).id;

  private form: FormGroup;
  public offerInvalid: boolean;
  private formSubmitAttempt: boolean;
  private newOffer;

  private formKeyWord: FormGroup;
  public keyWordInvalid: boolean;
  private formSubmitKeyWordAttempt: boolean;

  private sortedOffers = this.route.snapshot.data.offerList.sort(((a,b) => (a.id < b.id) ? 1 : -1));

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private serverCompanyService: ServerCompanyService,
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router
  ) {
    let id = this.companyUserId;
    this.companyUser = this.route.snapshot.data.companyUserList.find(function (x) {
      return x.id == id;
    });
  }

  ngOnInit() {
    this.dialog.closeAll();
    this.form = this.fb.group({
      addressCity: ['', Validators.required],
      addressNumber: ['', Validators.required],
      addressStreet: ['', Validators.required],
      addressZIPCode: ['', Validators.required],
      contractType_id: ['', Validators.required],
      description: ['', Validators.required],
      salary: ['', Validators.required],
      title: ['', Validators.required],
      keyWordOne_id: ['', Validators.required],
      keyWordTwo_id: ['', Validators.required],
      keyWordThree_id: ['', Validators.required],
    });
    this.formKeyWord = this.fb.group({
      name: ['', Validators.required]
    });
    this.map = L.map('map').setView([0,0], 0);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
  }

  onSubmitOffer() {
    if (this.form.valid) {
      try {
        this.newOffer = this.form.value;
        this.newOffer.latitude = this.latitude;
        this.newOffer.longitude = this.longitude;
        this.serverCompanyService.request("POST", "/offer/create", this.newOffer).subscribe(()=>this.redirect(), () => this.redirect());
      }
      catch (err) {
        this.offerInvalid = true;
      }
    }
    else {
      this.formSubmitAttempt = true;
    }
    
  }

  onSubmitKeyWord() {
    if (this.formKeyWord.valid) {
      try {
        this.serverCompanyService.request("POST", "/keyWord/create", this.formKeyWord.value).subscribe(()=>this.redirect(), () => this.redirect());
      }
      catch (err) {
        this.keyWordInvalid = true;
      }
    }
    else {
      this.formSubmitKeyWordAttempt = true;
    }
  }

  private address="";
  private data;
  onInput() {
    this.markers = [];
    this.markerLayer ? this.markerLayer.clearLayers() : '';
    this.address = this.form.value.addressNumber+" "+this.form.value.addressStreet+" "+this.form.value.addressZIPCode+" "+this.form.value.addressCity;
    if (this.form.value.addressNumber !== '' && this.form.value.addressStreet !== '' && this.form.value.addressZIPCode !== '' && this.form.value.addressCity !== '') {
      this.http.get("https://nominatim.openstreetmap.org/search?format=json&q="+this.address).subscribe(data => {
        this.data=data;
        this.latitude=data[0].lat;
        this.longitude=data[0].lon;
        this.markers[0] = L.marker([data[0].lat, data[0].lon], { icon: this.defaultIcon });
        this.markerLayer = L.layerGroup(this.markers);
        this.map.addLayer(this.markerLayer);
        this.map.setView(new L.LatLng(this.data[0].lat,this.data[0].lon), 15);
      });
    }
  }

  onDelete(id) {
    this.dialog.open(DeleteModalComponent, {
      data: {
        id: id,
        routeTarget: "/offer/delete/",
        routeOrigin: "/offer-company",
        userType: 'companyUser',
      }
    })
  }

  redirect() {
    // TEMP SOLUTION TO REFRESH PAGE
    this.router.navigateByUrl('/redirect', {skipLocationChange: true}).then(() =>
    this.router.navigate(['/offer-company']));
  }
}