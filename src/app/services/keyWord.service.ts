import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KeyWord } from '../models/KeyWord.model';

@Injectable({
  providedIn: 'root'
})
export class KeyWordService {
  private keyWordList: Array<KeyWord>;

  constructor(private http:HttpClient) { }

  getKeyWordList(): Array<KeyWord> {
    return this.keyWordList;
  }

  setKeyWordList(array: Array<KeyWord>) {
    this.keyWordList = array;
    return this;
  }

  // loadKeyWordList(): void {
  //   this.http
  //   .get<Array<KeyWord>>('http://pingjob.herokuapp.com/keyWord/list')
  //   .subscribe(data => {
  //     this.setKeyWordList(data);
  //   });
  // }

  preloadKeyWordList() {
    return this.http.get('http://pingjob.herokuapp.com/keyWord/list');
  }
}