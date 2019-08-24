import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Selection } from '../models/Selection.model';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private selectionList: Array<Selection>;

  constructor(private http:HttpClient) { }

  getSelectionList(): Array<Selection> {
    return this.selectionList;
  }

  setSelectionList(array: Array<Selection>) {
    this.selectionList = array;
    return this;
  }

  loadSelectionList(): void {
    this.http
    .get<Array<Selection>>('http://pingjob.herokuapp.com/selection/list')
    .subscribe(data => {
      this.setSelectionList(data);
    });
  }

  preloadSelectionList() {
    return this.http.get('http://pingjob.herokuapp.com/selection/list');
  }
}