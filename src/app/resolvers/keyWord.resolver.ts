import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { KeyWordService } from '../services/keyWord.service';

@Injectable()
export class KeyWordResolver implements Resolve<any> {
  constructor(private keyWordService: KeyWordService) {}

  resolve() {
    return this.keyWordService.preloadKeyWordList();
  }
}