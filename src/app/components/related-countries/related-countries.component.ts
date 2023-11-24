import { Component, OnInit } from '@angular/core';
import { Dimension, EndecapodService, SearchResult } from '@ibfd/endecapod';
import { map, take } from 'rxjs';
import { AppConfigData } from 'src/app/model/config/app-config-data';
import { AppConfigService } from 'src/app/services/app-config.service';
import { ExposeService } from 'src/app/services/expose.service';
interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-related-countries',
  templateUrl: './related-countries.component.html',
  styleUrls: ['./related-countries.component.css'],
  providers: [
    { provide: ExposeService, useClass: ExposeService },
  ],
})
export class RelatedCountriesComponent implements OnInit {
  private relatedCountryDimension: Dimension;
  private appConfigData: AppConfigData;

  relatedCountry: Object;
  selectedRelatedCountry: Object;



  constructor(   
    private appConfigService: AppConfigService,
    private endecapodService: EndecapodService,
    private exposeService: ExposeService
    ) { 
      this.appConfigData = new AppConfigData(this.appConfigService.config);
    }

  ngOnInit(): void {

    this.relatedCountryDimension = this.appConfigData.getRelatedCountryDimension();
    this.configureCountryExposeService();
    this.exposeService.Query()
    .pipe(map(res => new SearchResult(res)),take(1))
    .subscribe(res => {
      this.relatedCountry = res.getDimension(this.relatedCountryDimension.id).values;
      });
  }

  configureCountryExposeService() {
    this.exposeService.setName('Related-Country ' + this.relatedCountryDimension.id + '-ExposeService');
    this.exposeService.Copy(this.endecapodService);
    this.exposeService.setDym(false);
    this.exposeService.SetNe([this.relatedCountryDimension.id]);
  }


}