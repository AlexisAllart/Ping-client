import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-offer-user',
  templateUrl: './offer-user.component.html',
  styleUrls: ['./offer-user.component.scss']
})
export class OfferUserComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

}
