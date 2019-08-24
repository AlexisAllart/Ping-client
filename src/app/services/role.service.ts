import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../models/Role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private roleList: Array<Role>;

  constructor(private http:HttpClient) { }

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
    return this.http.get('http://pingjob.herokuapp.com/role/list');
  }
}