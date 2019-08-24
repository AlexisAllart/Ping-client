import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/Company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private companyList: Array<Company>;

  constructor(private http:HttpClient) { }

  getCompanyList(): Array<Company> {
    return this.companyList;
  }

  setCompanyList(array: Array<Company>) {
    this.companyList = array;
    return this;
  }

  // loadCompanyList(): void {
  //   this.http
  //   .get<Array<Company>>('http://pingjob.herokuapp.com/company/list')
  //   .subscribe(data => {
  //     this.setCompanyList(data);
  //   });
  // }

  preloadCompanyList() {
    return this.http.get('http://pingjob.herokuapp.com/company/list');
  }
}