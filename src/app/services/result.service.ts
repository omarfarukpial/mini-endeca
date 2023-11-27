import { Injectable } from '@angular/core';
import { EdcaUrlSerializer, EndecapodService, SearchResult } from '@ibfd/endecapod';
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
  propertyList: any;

  selectedCollectionsList: Collection[] =[];
  selectedCountriesList: Country[] = [];
  selectedRelatedCountriesList: RelatedCountry[] = [];

  totalResultCount: number = 0;

  private appConfigData: AppConfigData;

  constructor(
    private appConfigService: AppConfigService,
    private endecapodService: EndecapodService,
    private urlSerializer: EdcaUrlSerializer
  ) { 
    this.appConfigData = new AppConfigData(this.appConfigService.config);

    this.endecapodService.setURL(this.appConfigData.getEndecapodURL(), this.appConfigData.getAwareURL());
    this.endecapodService.RegisterParams(this.urlSerializer.parse('?' + this.appConfigData.getInitQuery()).queryParamMap);
    this.endecapodService.PopNe(this.appConfigData.getCollectionDimension().id);
    this.endecapodService.Paginate(0);

  }

  fetchResult(): void {
 
    this.endecapodService.DoSearch();
    this.endecapodService.Result()
      .pipe(filter(val => val instanceof SearchResult))
      .subscribe((res: SearchResult) => {
        this.result = res;
        this.setTotalResultCount(this.result.result.results.numBins);
        this.records = this.result.getRecords();
        this.properties = this.records.map(item => item.records.map(record => record.properties));
        this.propertyList = this.properties.flat();
        this.dataSubject.next(this.propertyList);
      });
  }

  setCollection(selectedCollection: Collection) {
    this.endecapodService.SetN([0, selectedCollection.id]);
    this.selectedCollectionsList.push(selectedCollection);
    this.fetchResult();
  }

  addCountry(selectedCountry: Country) {
    this.endecapodService.AddN(selectedCountry.id);
    this.selectedCountriesList.push(selectedCountry);
    this.fetchResult();
  }

  addRelatedCountry(selectedRelatedCountry: RelatedCountry) {
    this.endecapodService.AddN(selectedRelatedCountry.id);
    this.selectedRelatedCountriesList.push(selectedRelatedCountry);
    this.fetchResult();
  }

  setOffset(startingNumber: number) {
    this.endecapodService.Paginate(startingNumber);
    this.fetchResult();
  }

  setTotalResultCount(totalResult: number) {
    this.totalResultCount = totalResult;
  }

  getTotalResultCount(): number {
    return this.totalResultCount;
  }

  getSelectedCollectionsList(): Collection[] {
    return this.selectedCollectionsList;
  }

  getSelectedCountriesList(): Country[] {
    return this.selectedCountriesList;
  }

  getSelectedRelatedCountriesList(): RelatedCountry[] {
    return this.selectedRelatedCountriesList;
  }

}
