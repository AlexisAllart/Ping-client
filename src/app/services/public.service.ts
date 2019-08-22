import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/Company.model';
import { KeyWord } from '../models/KeyWord.model';
import { Offer } from '../models/Offer.model';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  private companyList: Array<Company>;
  private keyWordList: Array<KeyWord>;
  private offerList: Array<Offer>;

  constructor(private http:HttpClient) {}

  // QOL METHOD
  loadAll(): void {
    this.loadCompanyList();
    this.loadKeyWordList();
    this.loadOfferList();
    interval(60000).subscribe(() => this.loadCompanyList());
    interval(60000).subscribe(() => this.loadKeyWordList());
    interval(60000).subscribe(() => this.loadOfferList());
  }

  checkAll(): void {
    if (this.getCompanyList() && this.getKeyWordList() && this.getOfferList()) {}
    else {
      this.loadAll();
    }
  }

  // GETTERS
  getCompanyList(): Array<Company> {
    return this.companyList;
  }

  getKeyWordList(): Array<KeyWord> {
    return this.keyWordList;
  }

  getOfferList(): Array<Offer> {
    return this.offerList;
  }

  // SETTERS
  setCompanyList(array: Array<Company>) {
    this.companyList = array;
    return this;
  }

  setKeyWordList(array: Array<KeyWord>) {
    this.keyWordList = array;
    return this;
  }

  setOfferList(array: Array<Offer>) {
    this.offerList = array;
    return this;
  }
  
  // LOAD LISTS WITH DATA FROM DB (ALL PUBLIC DATA)
  loadKeyWordList(): void {
    this.http.get<Array<KeyWord>>('http://pingjob.herokuapp.com/keyWord/list').subscribe(data => {
      this.setKeyWordList(data);
      console.log("publicService.keyWordList successfully loaded :");
      console.log(this.getKeyWordList());
    });
  }

  loadCompanyList(): void {
    this.http.get<Array<Company>>('http://pingjob.herokuapp.com/company/list').subscribe(data => {
      this.setCompanyList(data);
      console.log("publicService.companyList successfully loaded :");
      console.log(this.getCompanyList());
    });
  }

  loadOfferList(): void {
    this.http.get<Array<Offer>>('http://pingjob.herokuapp.com/offer/list').subscribe(data => {
      this.setOfferList(data);
      console.log("publicService.offerList successfully loaded :");
      console.log(this.getOfferList());
    });
  }
}
