import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { CompanyUserService } from '../services/companyUser.service';

@Injectable()
export class CompanyUserResolver implements Resolve<any> {
  constructor(private companyUserService: CompanyUserService) {}

  resolve() {
    return this.companyUserService.preloadCompanyUserList();
  }
}