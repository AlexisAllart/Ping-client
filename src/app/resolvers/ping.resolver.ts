import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { PingService } from '../services/ping.service';

@Injectable()
export class PingResolver implements Resolve<any> {
  constructor(private pingService: PingService) {}

  resolve() {
    return this.pingService.preloadPingList();
  }
}