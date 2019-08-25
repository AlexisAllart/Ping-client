import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Offre } from 'src/app/offre';


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
        style({transform: 'translateY(-100px)', opacity: '0'}),
        animate('1000ms ease-in-out')
      ])
    ])
  ]
})
export class OfferCompanyComponent implements OnInit {

  keywords = ['Agile', 'SQL', 'Java', 'Curieux'];

  // model = [new Offre('Developpeur web', 'IBM', 'Un poste de Développeur Front-end en CDI. Travailler dans une ambiance bienveillante et stimulante et l’opportunité de vous investir dans des projets variés et passionnants','CDI', 1200, this.keywords[3])];

  model = [];

  constructor() { }

  ngOnInit() {
  }

  onSubmit(value: any){
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
