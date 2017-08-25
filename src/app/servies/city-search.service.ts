import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CitySearcService {

  // Observable string sources
  private citySearchStartedSource = new Subject<any>();

  // Observable string streams
  citySearchStarted$ = this.citySearchStartedSource.asObservable();

  // Service message commands
  startCitySearch(mission: any) {
    this.citySearchStartedSource.next(mission);
  }

}
