import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { TagService } from '../services/tag.service';

@Injectable()
export class TagResolver implements Resolve<any> {
  constructor(private tagService: TagService) {}

  resolve() {
    return this.tagService.preloadTagList();
  }
}