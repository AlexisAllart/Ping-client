import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/Company.model';
import { map } from 'rxjs/operators';
import { Offer } from '../models/Offer.model';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  companyList: Array<Company> = {} as Array<Company>;
  offerList: Array<Offer> = {} as Array<Offer>;
  private companyListLoaded=false;
  private offerListLoaded=false;

  constructor(private http:HttpClient) {

  }

  getAll(): void {
    this.getCompanyList()
    interval(300000)
    .subscribe(
      () => this.getCompanyList()
    );
    this.getOfferList();
    interval(300000)
    .subscribe(
      () => this.getOfferList()
    );
  }

  getCompanyList(): void {
    this.http.get<Array<Company>>('http://pingjob.herokuapp.com/company/list')
      .pipe(map(data => data))
      .subscribe(
        (companyList: Array<Company>) => {
          this.companyListLoaded = false;
          this.companyList = companyList;
          this.companyListLoaded = true;
        },
        err => {
          console.log(err);
        }
      );
  }

  getOfferList(): void {
    this.http.get<Array<Offer>>('http://pingjob.herokuapp.com/offer/list')
      .pipe(map(data => data))
      .subscribe(
        (offerList:Array<Offer>) => {
          this.offerListLoaded = false;
          this.offerList=offerList;
          this.offerListLoaded = true;
          // this.populateMarkers();
        },
        err => {
          console.log(err);
        }
      );
  }
}
