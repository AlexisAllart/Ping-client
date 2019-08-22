import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { HnService } from './hn.service';

@Injectable()
export class Resolver implements Resolve<any> {
  constructor(private hnService: HnService) {}

  resolve() {
    return this.hnService.getTopPosts();
  }
}