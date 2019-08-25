import { Injectable } from '@angular/core';
import { CompanyUser } from '../models/CompanyUser.model';
import { ServerCompanyService } from './serverCompany.service';


@Injectable({
  providedIn: 'root'
})
export class CompanyUserService {
  private companyUserList: Array<CompanyUser>;

  constructor(
    private serverCompany:ServerCompanyService
    ) { }

  getCompanyUserList(): Array<CompanyUser> {
    return this.companyUserList;
  }

  setCompanyUserList(array: Array<CompanyUser>) {
    this.companyUserList = array;
    return this;
  }

  // loadCompanyUserList(): void {
  //   this.http
  //   .get<Array<CompanyUser>>('http://pingjob.herokuapp.com/companyUser/list')
  //   .subscribe(data => {
  //     this.setCompanyUserList(data);
  //   });
  // }

  preloadCompanyUserList() {
  if (JSON.parse(localStorage.getItem('companyUserId')) !== null)
    {
      return this.serverCompany
      .request('GET', '/companyUser/list/');
    }
  }
}