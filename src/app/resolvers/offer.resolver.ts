import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { OfferService } from '../services/offer.service';

@Injectable()
export class OfferResolver implements Resolve<any> {
  constructor(private offerService: OfferService) {}

  resolve() {
    return this.offerService.preloadOfferList();
  }
}