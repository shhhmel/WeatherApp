import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import { DataService } from '../../servies/data.service';
import { CitySearcService } from '../../servies/city-search.service';

import { Data } from '../../models/data';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  public arraied = false;
  public subscription: Subscription;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartType: string = 'bar';
  public barChartLegend: boolean = false;

  public data: Data;
  public weatherChartDates: number[] = [];
  public wetherCharData: Data;
  public temperatureChartData: any[];
  public windChartData: any[];
  public presureChartData: any[];
  public humidityChartData: any[];

  constructor(
    private dataService: DataService,
    private citySearcService: CitySearcService,
    private flashMessagesService: FlashMessagesService
  ) {
    this.subscription = citySearcService.citySearchStarted$.subscribe(
      value => {
        // If ZIP Code
        if ((/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value.city))) {
          this.dataService.searchCityForecastZIP(value).subscribe(data => {
            this.wetherCharData = data;
            this.arrayDatas();
          },
          error => {
            this.flashMessagesService.show(error, { cssClass: 'alert-danger text-center mb-3', timeout: 4000 });
          })
        // If CIty
        } else {
          this.dataService.searchCityForecast(value).subscribe(data => {
            this.wetherCharData = data;
            this.arrayDatas();
          },
          error => {
            this.flashMessagesService.show('⛔ There is no such city or ZIP code!', { cssClass: 'alert-danger text-center mb-3', timeout: 4000 });
          })
        }
      });
  }

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      this.wetherCharData = data;
      this.arrayDatas();
    });
  }

  arrayDatas() {
    let data = this.wetherCharData;

    var weatherChartDatesClone = [];
    var windChartDataClone = [
      { data: [] }
    ];
    var temperatureChartDataClone = [
      { data: [] }
    ];
    var presureChartDataClone = [
      { data: [] }
    ];
    var humidityChartDataClone = [
      { data: [] }
    ];

    for (let i = 0; i < data.list.length; i++) {
      // Get dates
      weatherChartDatesClone.push(new Date(data.list[i].dt * 1000).getDate());

      // Geat wind speed
      windChartDataClone[0].data.push(data.list[i].speed);

      // Get temperature
      temperatureChartDataClone[0].data.push(Math.round(((data.list[i].temp.max - data.list[i].temp.min) / 2) + data.list[i].temp.min));

      // Get presure
      presureChartDataClone[0].data.push(data.list[i].pressure);

      // Get humidity
      humidityChartDataClone[0].data.push(data.list[i].humidity);
    }

    this.weatherChartDates = weatherChartDatesClone;

    this.windChartData = windChartDataClone;
    this.temperatureChartData = temperatureChartDataClone;
    this.presureChartData = presureChartDataClone;
    this.humidityChartData = humidityChartDataClone;

    this.arraied = true;
  }
}
