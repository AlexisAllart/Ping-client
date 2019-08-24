import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { StatusService } from '../services/status.service';

@Injectable()
export class StatusResolver implements Resolve<any> {
  constructor(private statusService: StatusService) {}

  resolve() {
    return this.statusService.preloadStatusList();
  }
}