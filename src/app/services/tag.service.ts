import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tag } from '../models/Tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private tagList: Array<Tag>;

  constructor(private http:HttpClient) { }

  getTagList(): Array<Tag> {
    return this.tagList;
  }

  setTagList(array: Array<Tag>) {
    this.tagList = array;
    return this;
  }

  // loadTagList(): void {
  //   this.http
  //   .get<Array<Tag>>('http://pingjob.herokuapp.com/tag/list')
  //   .subscribe(data => {
  //     this.setTagList(data);
  //   });
  // }

  preloadTagList() {
    return this.http.get('http://pingjob.herokuapp.com/tag/list');
  }
}