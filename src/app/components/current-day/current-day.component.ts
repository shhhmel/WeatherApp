import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import { DataService } from '../../servies/data.service';
import { CitySearcService } from '../../servies/city-search.service';

import { Data } from '../../models/data';
import { City } from '../../models/city';
import { Current } from '../../models/current';

@Component({
  selector: 'app-current-day',
  templateUrl: './current-day.component.html',
  styleUrls: ['./current-day.component.css']
})
export class CurrentDayComponent implements OnInit {
  public downloaded = false;
  public data: Data;
  public current: Current = {
    date: new Date(),
    name: '',
    country: '',
    temp: 0,
    desc: '',
    pressure: 0,
    humidity: 0,
    windSpeed: 0,
    clouds: 0,
    icon: ''
  };
  public iconCode: string;
  public subscription: Subscription;

  constructor(
    private dataService: DataService,
    private citySearcService: CitySearcService
  ) {
    this.subscription = citySearcService.citySearchStarted$.subscribe(
      value => {
        if ((/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value.city))) {
          this.dataService.searchCityZIPcode(value).subscribe(current => {
            this.current = current;
          })
        } else {
          this.dataService.searchCity(value).subscribe(current => {
            this.current = current;
          })
        }
    });
  }

  ngOnInit() {
    // Get empty data
    this.data = this.dataService.getEmptyData();

    // Get real data
    this.dataService.getCurrentData().subscribe(current => {
      this.current = current;
      this.setIcon();
      this.downloaded = true;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setIcon() {
    let icon = this.current.icon;
    switch(icon) {
      case '01d':
        this.iconCode = 'wi-day-sunny';
        break;
      case '01n':
        this.iconCode = 'wi-night-clear';
        break;
      case '02d':
        this.iconCode = 'wi-day-cloudy';
        break;
      case '02n':
        this.iconCode = 'wi-night-alt-cloudy';
        break;
      case '03d':
      case '03n':
        this.iconCode = 'wi-cloud';
        break;
      case '04d':
      case '04n':
        this.iconCode = 'wi-cloudy';
        break;
      case '09d':
      case '09n':
        this.iconCode = 'wi-showers';
        break;
      case '10d':
        this.iconCode = 'wi-day-rain';
        break;
      case '10n':
        this.iconCode = 'wi-night-alt-rain';
        break;
      case '11d':
      case '11n':
        this.iconCode = 'wi-thunderstorm';
        break;
      case '13d':
      case '13n':
        this.iconCode = 'wi-snow';
        break;
      case '50d':
      case '50n':
        this.iconCode = 'wi-dust';
        break;
    }
  }

}
