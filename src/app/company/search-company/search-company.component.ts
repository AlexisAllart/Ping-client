import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition,keyframes } from '@angular/animations';

@Component({
  selector: 'app-search-company',
  templateUrl: './search-company.component.html',
  styleUrls: ['./search-company.component.scss'],
  animations: [
    trigger('envoi',[
      state('small', style({
        display: 'none',
        color: 'blue'
      })),
      state('large', style({
        display: 'flex',
        color: 'blue'
      })),

      transition('small <=> large', animate('400ms ease-in'))
    ])
   
  ]

})
export class SearchCompanyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ///////////////////////////////////////////////////////

  search='';
  state: string = 'small';

  folderObjs=[{
    name:'flo mdr',
    size:'24 ans'
  },{
    name:'wahiba <3',
    size:'36 ans'
  },{
    name:'alex^^',
    size:'33 ans'
  },{
    name:'natacha <3',
    size:'25 ans'
  }]

  animateMe(){
    this.state = (this.state === 'small' ? 'large' : 'small');
  }


}
