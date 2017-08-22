import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../servies/data.service';
import { CitySearcService } from '../../servies/city-search.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  public subscription: Subscription;
  public isValid = true;

  constructor(
    private dataService: DataService,
    private citySearchService: CitySearcService
  ) { }

  ngOnInit() {
  }

  search(form) {
    if (form.valid) {
      this.citySearchService.startCitySearch(form.value);
      form.reset();
    } else {
      this.isValid = false;
    }
  }

  onKey() {
    this.isValid = true;
  }

}
