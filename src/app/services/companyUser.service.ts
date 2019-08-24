import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanyUser } from '../models/CompanyUser.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyUserService {
  private companyUserList: Array<CompanyUser>;

  constructor(private http:HttpClient) { }

  getCompanyUserList(): Array<CompanyUser> {
    return this.companyUserList;
  }

  setCompanyUserList(array: Array<CompanyUser>) {
    this.companyUserList = array;
    return this;
  }

  loadCompanyUserList(): void {
    this.http
    .get<Array<CompanyUser>>('http://pingjob.herokuapp.com/companyUser/list')
    .subscribe(data => {
      this.setCompanyUserList(data);
    });
  }

  preloadCompanyUserList() {
    return this.http.get('http://pingjob.herokuapp.com/companyUser/list');
  }
}