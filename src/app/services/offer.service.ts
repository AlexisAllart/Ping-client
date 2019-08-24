import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Offer } from '../models/offer.model';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private offerList: Array<Offer>;

  constructor(private http:HttpClient) { }

  sendOfferList() {
    this.loadOfferList();
    return this.getOfferList();
  }

  getOfferList(): Array<Offer> {
    return this.offerList;
  }

  setOfferList(array: Array<Offer>) {
    this.offerList = array;
    return this;
  }

  loadOfferList(): void {
    this.http
    .get<Array<Offer>>('http://pingjob.herokuapp.com/offer/list')
    .subscribe(data => {
      this.setOfferList(data);
    });
  }

  preloadOfferList() {
    return this.http.get('http://pingjob.herokuapp.com/offer/list');
  }
}