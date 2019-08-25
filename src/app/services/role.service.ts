import { Injectable } from '@angular/core';
import { Role } from '../models/Role.model';
import { ServerCompanyService } from './serverCompany.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private roleList: Array<Role>;

  constructor(
    private serverCompany:ServerCompanyService
    ) { }

  getRoleList(): Array<Role> {
    return this.roleList;
  }

  setRoleList(array: Array<Role>) {
    this.roleList = array;
    return this;
  }

  // loadRoleList(): void {
  //   this.http
  //   .get<Array<Role>>('http://pingjob.herokuapp.com/role/list')
  //   .subscribe(data => {
  //     this.setRoleList(data);
  //   });
  // }

  preloadRoleList() {
    if (JSON.parse(localStorage.getItem('companyUserId')) !== null)
    {
      return this.serverCompany
      .request('GET', '/role/list/');
    }
  }
}