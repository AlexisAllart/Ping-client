import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ContractType } from '../models/ContractType.model';
import { KeyWord } from '../models/KeyWord.model';
import { Status } from '../models/Status.model';
import { Tag } from '../models/Tag.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  contractTypeList: Array<ContractType> = {} as Array<ContractType>;
  keyWordList: Array<KeyWord> = {} as Array<KeyWord>;
  statusList: Array<Status> = {} as Array<Status>;
  tagList: Array<Tag> = {} as Array<Tag>;
  contractTypeListLoaded=false;
  keyWordListLoaded=false;
  statusListLoaded=false;
  tagListLoaded=false;

  constructor(private http:HttpClient) {

  }

  getAll() {
    // this.contractTypeList=this.getContractTypeList().then(console.log('getContractType attempt:'));
    // this.contractTypeListLoaded = true;
    console.log("return result");
    console.log(this.getContractTypeList());
    console.log(this.contractTypeList);
    // this.getKeyWordList();
    // this.getStatusList();
    // this.getTagList();
  }

  getContractTypeList(): any {
    this.http.get<Array<ContractType>>('http://pingjob.herokuapp.com/contractType/list')
      .pipe(map(data => data))
      .subscribe(
        (result:Array<ContractType>) => {
          this.contractTypeList = result;
        },
        err => {
          console.log(err);
        });
  }

  getKeyWordList(): void {
    this.http.get<Array<KeyWord>>('http://pingjob.herokuapp.com/keyWord/list')
      .pipe(map(data => data))
      .subscribe(
        (keyWordList:Array<KeyWord>) => {
          // this.keyWordListLoaded = false;
          this.keyWordList=keyWordList;
          this.keyWordListLoaded = true;
        },
        err => {
          console.log(err);
        }
      );
  }

  getStatusList(): void {
    this.http.get<Array<Status>>('http://pingjob.herokuapp.com/status/list')
      .pipe(map(data => data))
      .subscribe(
        (statusList:Array<Status>) => {
          // this.statusListLoaded = false;
          this.statusList=statusList;
          this.statusListLoaded = true;
        },
        err => {
          console.log(err);
        }
      );
  }

  getTagList(): void {
    this.http.get<Array<Tag>>('http://pingjob.herokuapp.com/tag/list')
      .pipe(map(data => data))
      .subscribe(
        (tagList:Array<Tag>) => {
          // this.tagListLoaded = false;
          this.tagList=tagList;
          this.tagListLoaded = true;
        },
        err => {
          console.log(err);
        }
      );
  }
}
