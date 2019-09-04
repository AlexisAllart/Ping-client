import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition,keyframes } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private route: ActivatedRoute
  ) { }

  
  state: string = 'small';
  private usersWithKeyWords = this.route.snapshot.data.userList;
  private search = '';
  private filteredArray = [];
  
  ngOnInit() {
    for (let i = 0; i < this.route.snapshot.data.userList.length; i++) {
      this.usersWithKeyWords[i].keyWords =
      this.route.snapshot.data.userList[i].KeyWordOne.name +
      "&"+
      this.route.snapshot.data.userList[i].KeyWordTwo.name +
      "&"+
      this.route.snapshot.data.userList[i].KeyWordThree.name;
    }
    this.filteredArray = this.usersWithKeyWords.filter((v) => v.keyWords.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
  }

  change() {
    this.filteredArray = this.usersWithKeyWords.filter((v) => v.keyWords.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
  }

  animateMe(){
    this.state = (this.state === 'small' ? 'large' : 'small');
  }
}
