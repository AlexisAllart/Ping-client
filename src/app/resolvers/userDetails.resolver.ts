import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserDetailsService } from '../services/userDetails.service';

@Injectable()
export class UserDetailsResolver implements Resolve<any> {
  constructor(private userDetailsService: UserDetailsService) {}

  resolve() {
    return this.userDetailsService.preloadUserDetails();
  }
}