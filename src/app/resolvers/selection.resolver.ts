import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { SelectionService } from '../services/selection.service';

@Injectable()
export class SelectionResolver implements Resolve<any> {
  constructor(private selectionService: SelectionService) {}

  resolve() {
    return this.selectionService.preloadSelectionList();
  }
}