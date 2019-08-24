import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContractType } from '../models/ContractType.model';

@Injectable({
  providedIn: 'root'
})
export class ContractTypeService {
  private contractTypeList: Array<ContractType>;

  constructor(private http:HttpClient) { }

  getContractTypeList(): Array<ContractType> {
    return this.contractTypeList;
  }

  setContractTypeList(array: Array<ContractType>) {
    this.contractTypeList = array;
    return this;
  }

  // loadContractTypeList(): void {
  //   this.http
  //   .get<Array<ContractType>>('http://pingjob.herokuapp.com/contractType/list')
  //   .subscribe(data => {
  //     this.setContractTypeList(data);
  //   });
  // }

  preloadContractTypeList() {
    return this.http.get('http://pingjob.herokuapp.com/contractType/list');
  }
}