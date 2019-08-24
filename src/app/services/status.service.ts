import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Status } from '../models/Status.model';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private statusList: Array<Status>;

  constructor(private http:HttpClient) { }

  getStatusList(): Array<Status> {
    return this.statusList;
  }

  setStatusList(array: Array<Status>) {
    this.statusList = array;
    return this;
  }

  // loadStatusList(): void {
  //   this.http
  //   .get<Array<Status>>('http://pingjob.herokuapp.com/status/list')
  //   .subscribe(data => {
  //     this.setStatusList(data);
  //   });
  // }

  preloadStatusList() {
    return this.http.get('http://pingjob.herokuapp.com/status/list');
  }
}