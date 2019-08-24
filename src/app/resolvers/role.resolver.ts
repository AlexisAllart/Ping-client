import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { RoleService } from '../services/role.service';

@Injectable()
export class RoleResolver implements Resolve<any> {
  constructor(private roleService: RoleService) {}

  resolve() {
    return this.roleService.preloadRoleList();
  }
}