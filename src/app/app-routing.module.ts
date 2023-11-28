import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DocShowComponent } from './components/doc-show/doc-show.component';
import { ResultsComponent } from './components/results/results.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'search', component: HomeComponent},
  {path: 'doc', component: DocShowComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
