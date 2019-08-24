import { Injectable } from '@angular/core';
import { CompanyService } from './company.service';
import { CompanyUserService } from './companyUser.service';
import { ContractTypeService } from './contractType.service';
import { KeyWordService } from './keyWord.service';
import { OfferService } from './offer.service';
import { PingService } from './ping.service';
import { RoleService } from './role.service';
import { SelectionService } from './selection.service';
import { StatusService } from './status.service';
import { TagService } from './tag.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private companyList;
  private companyUserList;
  private contractTypeList;
  private keyWordList;
  private offerList;
  private pingList;
  private roleList;
  private selectionList;
  private statusList;
  private tagList;
  private userList;

  constructor(
    private companyService: CompanyService,
    private companyUserService: CompanyUserService,
    private contractTypeService: ContractTypeService,
    private keyWordService: KeyWordService,
    private offerService: OfferService,
    private pingService: PingService,
    private roleService: RoleService,
    private selectionService: SelectionService,
    private statusService: StatusService,
    private tagService: TagService,
    private userService: UserService
  ) { }

  loadAllLists(array) {
    array.companyList!==null?this.companyList=array.companyList:'';
    array.companyUserList!==null?this.companyUserList=array.companyUserList:'';
    array.contractTypeList!==null?this.contractTypeList=array.contractTypeList:'';
    array.keyWordList!==null?this.keyWordList=array.keyWordList:'';
    array.offerList!==null?this.offerList=array.offerList:'';
    array.pingList!==null?this.pingList=array.pingList:'';
    array.roleList!==null?this.roleList=array.roleList:'';
    array.selectionList!==null?this.selectionList=array.selectionList:'';
    array.statusList!==null?this.statusList=array.statusList:'';
    array.tagList!==null?this.tagList=array.tagList:'';
    array.userList!==null?this.userList=array.userList:'';
  }

  // GETTERS
  getCompanyList() {
    return this.companyList;
  }
  
  getCompanyUserList() {
    return this.companyUserList;
  }
  
  getContractTypeList() {
    return this.contractTypeList;
  }
  
  getKeyWordList() {
    return this.keyWordList;
  }
  
  getOfferList() {
    return this.offerList;
  }
  
  getPingList() {
    return this.pingList;
  }
  
  getRoleList() {
    return this.roleList;
  }
  
  getSelectionList() {
    return this.selectionList;
  }
  
  getStatusList() {
    return this.statusList;
  }
  
  getTagList() {
    return this.tagList;
  }
  
  getUserList() {
    return this.userList;
  }
}
