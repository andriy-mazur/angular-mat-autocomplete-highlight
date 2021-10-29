import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

export class State {
  constructor(
    public name: string,
    public population: string
  ) {}
}

/**
 * @title Autocomplete overview
 */
@Component({
  selector: 'autocomplete-overview-example',
  templateUrl: 'autocomplete-overview-example.html',
  styleUrls: ['autocomplete-overview-example.css'],
})
export class AutocompleteOverviewExample {
  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;
  toHighlight: string = '';
  keyed: boolean;
  states: State[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
    },
    {
      name: 'California',
      population: '39.14M',
    },
    {
      name: 'Florida',
      population: '20.27M',
    },
    {
      name: 'Texas',
      population: '27.47M',
    },
  ];

  theObj: any;
  theState: any;
  thePopulation: any;

  constructor() {
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      // map(( query ) => this.filterStates(query))
      map(value => (typeof value === "string" ? value : "zzz")),
      map(name => (name ? this.filterStates(name) : this.states.slice()))
    );
  }

  filterStates(query: string) {
    this.toHighlight = query;
    return this.states.filter(
      (state) => state.name.toLowerCase().indexOf(query.toLowerCase()) >= 0
    );
  }

  stateSelected(event: any) {
    this.theObj = event;
    // this.theState = event.option.value.name;
    // this.thePopulation = event.option.value.population;
  }
}

import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'highlight' })
export class HighlightPipe implements PipeTransform {
  transform(text: string, search): string {
    const pattern = search
      .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
      .split(' ')
      .filter((t) => t.length > 0)
      .join('|');
    const regex = new RegExp(pattern, 'gi');
    const match = text.match(regex);
    
    return !match ? text : search ? text.replace(regex, (match) => `<b>${match}</b>`) : text;
  }
}
