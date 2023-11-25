import { Component, Injectable, OnInit } from '@angular/core';
import { EndecapodService, SearchResult } from '@ibfd/endecapod';
import { filter } from 'rxjs';
import { ResultService } from 'src/app/services/result.service';


interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  results: Object;

  constructor(
    private resultService: ResultService
  ) {}

  ngOnInit(): void {

    this.resultService.fetchResult();
    this.resultService.data$.subscribe((data) => {
      this.results = data;
      console.log("Results: ", this.results);
      
    });
    

  }

  first: number = 0;

  rows: number = 10;

  onPageChange(event: PageEvent) {
      this.first = event.first;
      this.rows = event.rows;
  }

}
