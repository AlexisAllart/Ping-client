import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { CompanyUser } from 'src/app/models/CompanyUser.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServerCompanyService } from 'src/app/services/serverCompany.service';


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

  private companyUser: CompanyUser;
  private companyUserId = JSON.parse(localStorage.getItem('companyUserId')).id;

  private form: FormGroup;
  public offerInvalid: boolean;
  private formSubmitAttempt: boolean;

  private formKeyWord: FormGroup;
  public keyWordInvalid: boolean;
  private formSubmitKeyWordAttempt: boolean;


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private serverCompanyService: ServerCompanyService
  ) {
    let id = this.companyUserId;
    this.companyUser = this.route.snapshot.data.companyUserList.find(function (x) {
      return x.id = id;
    });
  }

  ngOnInit() {
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
      keyWordThree_id: ['', Validators.required]
    })
    this.formKeyWord = this.fb.group({
      name: ['', Validators.required]
    })
  }

  onSubmitOffer() {
    
  }

  onSubmitKeyWord() {
    if (this.formKeyWord.valid) {
      try {
        this.serverCompanyService.request("POST", "/keyWord/create", this.formKeyWord.value).subscribe();
      }
      catch (err) {
        this.keyWordInvalid = true;
      }
    }
    else {
      this.formSubmitKeyWordAttempt = true;
    }
  }
}
