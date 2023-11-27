import { Component, OnInit } from '@angular/core';
import { Collection } from 'src/app/model/data/collection';
import { Country } from 'src/app/model/data/country';
import { RelatedCountry } from 'src/app/model/data/relatedCountry';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  selectedCollectionsList: Collection[];
  selectedCountriesList: Country[];
  selectedRelatedCountriesList: RelatedCountry[];

  constructor(private resultService: ResultService) {}

  ngOnInit(): void {
    this.selectedCollectionsList = this.resultService.getSelectedCollectionsList();
    this.selectedCountriesList = this.resultService.getSelectedCountriesList();
    this.selectedRelatedCountriesList = this.resultService.getSelectedRelatedCountriesList();

  }
  ngOnChange() {
    this.selectedCollectionsList = this.resultService.getSelectedCollectionsList();
    this.selectedCountriesList = this.resultService.getSelectedCountriesList();
    this.selectedRelatedCountriesList = this.resultService.getSelectedRelatedCountriesList();
    
  }
}
