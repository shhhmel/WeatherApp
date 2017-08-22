import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { CurrentDayComponent } from './components/current-day/current-day.component';
import { ForecastComponent } from './components/forecast/forecast.component';

import { DataService } from './servies/data.service';
import { CitySearcService } from './servies/city-search.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchFormComponent,
    CurrentDayComponent,
    ForecastComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ChartsModule,
    FormsModule,
    FlashMessagesModule
  ],
  providers: [
    DataService,
    CitySearcService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
