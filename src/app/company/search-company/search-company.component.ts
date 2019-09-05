import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition,keyframes } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerCompanyService } from 'src/app/services/serverCompany.service';

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
    private route: ActivatedRoute,
    private serverCompanyService: ServerCompanyService,
    private router: Router
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

  addSelection(id) {
    let data = {
      user_id: id
    }
    this.serverCompanyService.request("POST", "/selection/create", data).subscribe(()=>this.router.navigateByUrl(
      '/redirect', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/search-company']))
    );
  }
}
