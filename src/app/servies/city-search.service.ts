import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class CitySearcService {

  // Observable string sources
  private missionAnnouncedSource = new Subject<any>();

  // Observable string streams
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();

  // Service message commands
  announceMission(mission: any) {
    this.missionAnnouncedSource.next(mission);
  }

}
