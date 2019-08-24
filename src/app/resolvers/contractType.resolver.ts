import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ContractTypeService } from '../services/contractType.service';

@Injectable()
export class ContractTypeResolver implements Resolve<any> {
  constructor(private contractTypeService: ContractTypeService) {}

  resolve() {
    return this.contractTypeService.preloadContractTypeList();
  }
}