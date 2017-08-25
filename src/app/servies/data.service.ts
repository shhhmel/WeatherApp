import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Data } from '../models/data';
import { Current } from '../models/current';

@Injectable()
export class DataService {
  private cityName: string;
  private ZIPcode: string;
  private count = 16;
  private appID = '7fbec9e4ca51aa254b8e2d04bbb01e85';
  private URL: string;
  private defaultURL: string;

  constructor(
    private http: Http
  ) {
    this.cityName = 'dnipropetrovsk';
    this.defaultURL = 'http://api.openweathermap.org/data/2.5/forecast/daily';
    this.URL = `${this.defaultURL}?q=${this.cityName}&cnt=${this.count}&units=metric&APPID=${this.appID}`;
  }

  searchCityForecast(form): Observable<Data> {
    return this.http.get(this.URL)
      .map(res => res.json());
  }

  searchCityForecastZIP(form): Observable<Data> {
    this.ZIPcode = form.city;
    this.URL = `${this.defaultURL}?zip=${this.ZIPcode}&cnt=${this.count}&units=metric&APPID=${this.appID}`;
    return this.http.get(this.URL)
      .map(res => res.json());
  }

  searchCity(form): Observable<Current> {
    this.cityName = form.city;
    this.URL = `${this.defaultURL}?q=${this.cityName}&cnt=${this.count}&units=metric&APPID=${this.appID}`;
    return this.http.get(this.URL)
    .map(res => {
      const data = res.json();

      const currentData: Current = {
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

      // Get current Date
      currentData.date = new Date(data.list[0].dt * 1000);

      // Get current City Name
      currentData.name = data.city.name;

      // Get current Country
      currentData.country = data.city.country;

      // Get current Temperature
      currentData.temp = Math.round(((data.list[0].temp.max - data.list[0].temp.min) / 2) + data.list[0].temp.min);

      // Get current Description
      currentData.desc = data.list[0].weather[0].description;

      // Get current Pressure
      currentData.pressure = Math.round(data.list[0].pressure);

      // Get current Humidity
      currentData.humidity = Math.round(data.list[0].humidity * 0.75006375541921);

      // Get current Wind Speed
      currentData.windSpeed = Math.round(data.list[0].speed);

      // Get current Clouds
      currentData.clouds = data.list[0].clouds;

      // Get current Icon
      currentData.icon = data.list[0].weather[0].icon;

      return currentData;
    });
  }

  searchCityZIPcode(form): Observable<Current> {
    this.ZIPcode = form.city;
    this.URL = `${this.defaultURL}?zip=${this.ZIPcode}&cnt=${this.count}&units=metric&APPID=${this.appID}`;
    return this.http.get(this.URL)
    .map(res => {
      const data = res.json();

      const currentData: Current = {
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

      // Get current Date
      currentData.date = new Date(data.list[0].dt * 1000);

      // Get current City Name
      currentData.name = data.city.name;

      // Get current Country
      currentData.country = data.city.country;

      // Get current Temperature
      currentData.temp = Math.round(((data.list[0].temp.max - data.list[0].temp.min) / 2) + data.list[0].temp.min);

      // Get current Description
      currentData.desc = data.list[0].weather[0].description;

      // Get current Pressure
      currentData.pressure = Math.round(data.list[0].pressure);

      // Get current Humidity
      currentData.humidity = Math.round(data.list[0].humidity * 0.75006375541921);

      // Get current Wind Speed
      currentData.windSpeed = Math.round(data.list[0].speed);

      // Get current Clouds
      currentData.clouds = data.list[0].clouds;

      // Get current Icon
      currentData.icon = data.list[0].weather[0].icon;

      return currentData;
    });
  }

  getEmptyData() {
    return {
      city: {
        coord: {
          lon: 0,
          lat: 0
        },
        country: '',
        id: 0,
        name: '',
        population: 0
      },
      cnt: 0,
      cod: '',
      list: [
        {
          clouds: 0,
          deg: 0,
          dt: 0,
          humidity: 0,
          pressure: 0,
          rain: 0,
          speed: 0,
          temp: {
            day: 0,
            eve: 0,
            max: 0,
            min: 0,
            morn: 0,
            night: 0,
          },
          weather: [
            {
              description: '',
              icon: '',
              id: 0,
              main: ''
            }
          ]
        }
      ],
      message: 0
    };
  }

  // Get Data by name
  getData(): Observable<Data> {
    return this.http.get(this.URL)
      .map(res => res.json());
  }

  getCurrentData(): Observable<Current> {
    return this.http.get(this.URL)
      .map(res => {
        const data = res.json();

        const currentData: Current = {
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

        // Get current Date
        currentData.date = new Date(data.list[0].dt * 1000);

        // Get current City Name
        currentData.name = data.city.name;

        // Get current Country
        currentData.country = data.city.country;

        // Get current Temperature
        currentData.temp = Math.round(((data.list[0].temp.max - data.list[0].temp.min) / 2) + data.list[0].temp.min);

        // Get current Description
        currentData.desc = data.list[0].weather[0].description;

        // Get current Pressure
        currentData.pressure = Math.round(data.list[0].pressure);

        // Get current Humidity
        currentData.humidity = Math.round(data.list[0].humidity * 0.75006375541921);

        // Get current Wind Speed
        currentData.windSpeed = Math.round(data.list[0].speed);

        // Get current Clouds
        currentData.clouds = data.list[0].clouds;

        // Get current Icon
        currentData.icon = data.list[0].weather[0].icon;

        return currentData;
      });
  }

}
