import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FiltersComponent } from './components/filters/filters.component';
import { ResultsComponent } from './components/results/results.component';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SingleResultComponent } from './components/single-result/single-result.component';
import { HttpClientModule } from '@angular/common/http';
import { EndecapodModule } from '@ibfd/endecapod';
import { AppConfigService } from './services/app-config.service';
import { CollectionsComponent } from './components/collections/collections.component';
import { CountriesComponent } from './components/countries/countries.component';
import { RelatedCountriesComponent } from './components/related-countries/related-countries.component';
import { DocShowComponent } from './components/doc-show/doc-show.component';
import { HomeComponent } from './components/home/home.component';


const appConfigFactory = (appConfigService: AppConfigService) => {
  return () => appConfigService.loadAppConfig();
};

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    FiltersComponent,
    ResultsComponent,
    SingleResultComponent,
    CollectionsComponent,
    CountriesComponent,
    RelatedCountriesComponent,
    DocShowComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    EndecapodModule,
    NgbModule,
    FormsModule,
    BsDropdownModule,
    PaginatorModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appConfigFactory,
      multi: true,
      deps: [AppConfigService]
    }],
  bootstrap: [AppComponent],
})
export class AppModule {}
