import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Offre } from 'src/app/offre';
import { ActivatedRoute } from '@angular/router';
import { CompanyUser } from 'src/app/models/CompanyUser.model';


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

  keywords = ['Agile', 'SQL', 'Java', 'Curieux'];

  // model = [new Offre('Developpeur web', 'IBM', 'Un poste de Développeur Front-end en CDI. Travailler dans une ambiance bienveillante et stimulante et l’opportunité de vous investir dans des projets variés et passionnants','CDI', 1200, this.keywords[3])];

  model = [];

  private companyUserId = JSON.parse(localStorage.getItem('companyUserId')).id;

  constructor(
    private route: ActivatedRoute
  ) {
    let id = this.companyUserId;
    this.companyUser = this.route.snapshot.data.companyUserList.find(function (x) {
      return x.id = id;
    });
  }

  ngOnInit() {
  }

  onSubmit(value: any) {
    this.model.unshift(
      new Offre(
        value.job_name,
        value.company_name,
        value.description,
        value.contract_type,
        value.salary,
        value.keyword
      )
    );
  }

}
