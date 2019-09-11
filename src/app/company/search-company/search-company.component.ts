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
  private filteredUsers = [];
  private addedUsers = [];
  private newUsers = [];
  
  ngOnInit() {
    this.filterUsers();
    this.usersWithKeyWords = this.filteredUsers;
    for (let i = 0; i < this.usersWithKeyWords.length; i++) {
      this.usersWithKeyWords[i].keyWords =
      this.usersWithKeyWords[i].KeyWordOne.name +
      "&"+
      this.usersWithKeyWords[i].KeyWordTwo.name +
      "&"+
      this.usersWithKeyWords[i].KeyWordThree.name +
      "&"+
      this.usersWithKeyWords[i].firstName+
      " "+
      this.usersWithKeyWords[i].lastName+
      " "+
      this.usersWithKeyWords[i].firstName;
    }
    this.change();
  }

  filterUsers() {
    this.route.snapshot.data.userList.forEach(user =>
      user.available ? this.filteredUsers.push(user):'');
  }

  sortUsers() {
    let match = false;
    this.addedUsers = [];
    this.newUsers = [];
    this.filteredArray.forEach(user => {
      match = false;
      this.route.snapshot.data.selectionList.forEach(selection => {
        if (selection.User.id == user.id) {
          match = true;
        }
      });
      match ? this.addedUsers.push(user) : this.newUsers.push(user) ;
    });
  }

  change() {
    this.filteredArray = this.usersWithKeyWords.filter((v) => v.keyWords.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
    this.sortUsers();
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

  removeSelection(id) {
    let selection = this.route.snapshot.data.selectionList.find(function(x) {
      return x.user_id == id;
    });
    this.serverCompanyService.request("DELETE", "/selection/delete/"+selection.id).subscribe(
      (res)=>this.router.navigateByUrl('/redirect', {skipLocationChange: true}).then(() => this.router.navigate(['/search-company'])),
      (err)=>this.router.navigateByUrl('/redirect', {skipLocationChange: true}).then(() => this.router.navigate(['/search-company']))
    );
  }
}
