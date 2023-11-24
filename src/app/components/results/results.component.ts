import { Component, Injectable, OnInit } from '@angular/core';
import { EndecapodService, SearchResult } from '@ibfd/endecapod';
import { filter } from 'rxjs';

export interface EneRecord {
  properties: any;
  records: EneRecord[];
  dimensionValues: any;
}

@Injectable()
export class ResultExposeService extends EndecapodService {}


interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  providers: [
    { provide: ResultExposeService, useClass: ResultExposeService },
  ],
})
export class ResultsComponent implements OnInit {

  
  result: any | SearchResult;

  records: EneRecord[]= [];
  properties: any;
  p: any;
  itemContainer: number[] = [4294963454];

  constructor(
    private endecapodService: EndecapodService,
    private resultExposeService: ResultExposeService,
  ) { 
   
  }

  ngOnInit(): void {

    this.resultExposeService.Result()
    .pipe(filter(v => v instanceof SearchResult))
    .subscribe((res: (SearchResult|any)) => {
      this.result = res;
      this.process_result();
    });


    this.funSubmit(this.itemContainer);



  }


  process_result(): void {
    this.records = this.result.getRecords();
    console.log("records : ", this.records);
    this.properties=this.records.map(item =>{ 
      return {properties: item.properties};
    });
    this.p = this.properties.map((item:any) =>item.properties);  
  }


  funSubmit(n: number[]){
    this.resultExposeService.Copy(this.endecapodService);
    n.forEach(item => this.resultExposeService.AddN(item));
    this.resultExposeService.setDym(false);
    this.resultExposeService.DoSearch();
  }



  first: number = 0;

  rows: number = 10;

  onPageChange(event: PageEvent) {
      this.first = event.first;
      this.rows = event.rows;
  }

}
