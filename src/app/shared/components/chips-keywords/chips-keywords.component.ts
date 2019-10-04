import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { TmdbMoviesService } from '../../services/tmdb-movies.service';

@Component({
  selector: 'app-chips-keywords',
  templateUrl: './chips-keywords.component.html',
  styleUrls: ['./chips-keywords.component.css']
})
export class ChipsKeywordsComponent implements OnInit, OnDestroy {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  frmCtrl_keyworkds = new FormControl();
  filteredKeywords$: Observable<any>;
  subscription: Subscription;

  @ViewChild('fruitInput', {static: false}) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor(private movieService: TmdbMoviesService) {
    this.subscription = this.frmCtrl_keyworkds.valueChanges
    .subscribe(value => {
      if (value && (typeof (value) == 'string')) {
        this.filteredKeywords$ = this._filterKeywords(value);
        //this.moviesService.with_original_language = null;
      }
      //else this.moviesService.with_original_language = value.iso_639_1;
    });
    
  }

  add(event: MatChipInputEvent): void {
    // Add keyword only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
console.log(input);
console.log(value);
      // Add our keyword
      if ((value || '').trim()) {
        this.movieService.keywords.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.frmCtrl_keyworkds.setValue(null);
    }
  }

  remove(value: any): void {
    const index = this.movieService.keywords.indexOf(value);

    if (index >= 0) {
      this.movieService.keywords.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // this.keywords.push(event.option.viewValue);
    this.movieService.keywords.push(event.option.value);
    this.fruitInput.nativeElement.value = '';
    this.frmCtrl_keyworkds.setValue(null);
  }

  private _filterKeywords(query: string): any {
    const filterValue = query.toLowerCase();
    return this.movieService.GetKeywords(filterValue);
  }

  ngOnInit() {    
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
