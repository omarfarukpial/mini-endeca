import { Injectable } from '@angular/core';
import { EndecapodService, SearchResult } from '@ibfd/endecapod';
import { AppConfigData } from '../model/config/app-config-data';
import { AppConfigService } from './app-config.service';
import { Subject, filter } from 'rxjs';
import { Collection } from '../model/data/collection';
import { Country } from '../model/data/country';
import { RelatedCountry } from '../model/data/relatedCountry';

export interface EneRecord {
  properties: any;
  records: EneRecord[];
  dimensionValues: any;
}



@Injectable({
  providedIn: 'root'
})
export class ResultService {

  result: any | SearchResult;

  private selectedCollection: Collection;
  private previousCollection: Collection;

  private selectedCountry: Country;
  private selectedRelatedCountry: RelatedCountry;

  private dataSubject = new Subject<any>();
  data$ = this.dataSubject.asObservable();


  records: EneRecord[]= [];
  properties: any;
  p: any;
  itemContainer: number[] = [0];

  private appConfigData: AppConfigData;

  constructor(
    private appConfigService: AppConfigService,
    private endecapodService: EndecapodService
  ) { 
    this.appConfigData = new AppConfigData(this.appConfigService.config);
    this.endecapodService.AddNe(7487);
    // this.endecapodService.setDym(false);
  }



  fetchResult(): void {

    console.log("Item array: ", this.itemContainer);
    

    // this.itemContainer.forEach(item => this.endecapodService.AddN(item));
    this.endecapodService.SetN(this.itemContainer);
   
    this.endecapodService.DoSearch();

    this.endecapodService.Result()
    .pipe(filter(val => val instanceof SearchResult))
    .subscribe((res: SearchResult) => {
      this.result = res;
      this.records = this.result.getRecords();
      this.properties=this.records.map(item =>{ 
        return {properties: item.properties};
      });
      this.p = this.properties.map((item:any) =>item.properties);  

      this.dataSubject.next(this.p);
      

    });
  }



  setCollection(selectedCollection: Collection) {
    if (this.previousCollection) {
      const indexToRemove = this.itemContainer.indexOf(this.previousCollection.id);
      if (indexToRemove !== -1) {
        this.itemContainer.splice(indexToRemove, 1);
      }
    }
    this.itemContainer.push(selectedCollection.id);
    this.previousCollection = selectedCollection;
    console.log(selectedCollection);
    this.fetchResult();
    
  }

  addCountry(selectedCountry: Country) {
    this.itemContainer.push(selectedCountry.id);
    this.fetchResult();
  }


  addRelatedCountry(selectedRelatedCountry: RelatedCountry) {
    this.itemContainer.push(selectedRelatedCountry.id);
    this.fetchResult();
  }
  






}
