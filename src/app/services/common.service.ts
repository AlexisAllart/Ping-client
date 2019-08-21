import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContractType } from '../models/ContractType.model';
import { Status } from '../models/Status.model';
import { Tag } from '../models/Tag.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private contractTypeList: Array<ContractType> = {} as Array<ContractType>;
  private statusList: Array<Status> = {} as Array<Status>;
  private tagList: Array<Tag> = {} as Array<Tag>;

  constructor(private http:HttpClient) {}

  // QOL METHOD
  loadAll(): void {
    this.loadContractTypeList();
    this.loadStatusList();
    this.loadTagList();
  }

  // GETTERS
  getContractTypeList(): Array<ContractType> {
    return this.contractTypeList;
  }

  getStatusList(): Array<Status> {
    return this.statusList;
  }

  getTagList(): Array<Tag> {
    return this.tagList;
  }

  // SETTERS
  setContractTypeList(array: Array<ContractType>) {
    this.contractTypeList = array;
    return this;
  }

  setStatusList(array: Array<Status>) {
    this.statusList = array;
    return this;
  }

  setTagList(array: Array<Tag>) {
    this.tagList = array;
    return this;
  }

  // LOAD LISTS WITH DATA FROM DB (ALL COMMON DATA)
  loadContractTypeList(): void {
    this.http.get<Array<ContractType>>('http://pingjob.herokuapp.com/contractType/list').subscribe(data => {
      this.setContractTypeList(data);
      console.log("commonService.contractTypeList successfully loaded :");
      console.log(this.getContractTypeList());
    });
  }
  
  loadStatusList(): void {
    this.http.get<Array<Status>>('http://pingjob.herokuapp.com/status/list').subscribe(data => {
      this.setStatusList(data);
      console.log("commonService.statusList successfully loaded :");
      console.log(this.getStatusList());
    });
  }

  loadTagList(): void {
    this.http.get<Array<Tag>>('http://pingjob.herokuapp.com/tag/list').subscribe(data => {
      this.setTagList(data);
      console.log("commonService.tagList successfully loaded :");
      console.log(this.getTagList());
    });
  }
}
