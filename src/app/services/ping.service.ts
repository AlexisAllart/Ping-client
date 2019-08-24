import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ping } from '../models/Ping.model';
import { ServerService } from '../services/server.service';

@Injectable({
  providedIn: 'root'
})
export class PingService {
  private pingList: Array<Ping>;
  
  constructor(private http:HttpClient,private server: ServerService) { }

  getPingList(): Array<Ping> {
    return this.pingList;
  }

  setPingList(array: Array<Ping>) {
    this.pingList = array;
    return this;
  }

  loadPingList(): void {
    this.server.request('GET', '/ping/list').subscribe((data: Array<Ping>) => {
      this.setPingList(data);
    });
  }

  preloadPingList() {
    return this.http.get('http://pingjob.herokuapp.com/ping/list');
  }
}