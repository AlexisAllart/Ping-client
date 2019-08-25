import { Injectable } from '@angular/core';
import { Selection } from '../models/Selection.model';
import { ServerCompanyService } from './serverCompany.service';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private selectionList: Array<Selection>;

  constructor(
    private serverCompany:ServerCompanyService) { }

  getSelectionList(): Array<Selection> {
    return this.selectionList;
  }

  setSelectionList(array: Array<Selection>) {
    this.selectionList = array;
    return this;
  }

  // loadSelectionList(): void {
  //   this.http
  //   .get<Array<Selection>>('http://pingjob.herokuapp.com/selection/list')
  //   .subscribe(data => {
  //     this.setSelectionList(data);
  //   });
  // }

  preloadSelectionList() {
    if (JSON.parse(localStorage.getItem('companyUserId')) !== null)
    {
      return this.serverCompany
      .request('GET', '/selection/list/');
    }
  }
}