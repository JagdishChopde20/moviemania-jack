import { Component, OnInit, OnDestroy } from '@angular/core';
import { TmdbMoviesService } from 'src/app/shared/services/tmdb-movies.service';
import { FormControl } from '@angular/forms';
import { take, debounceTime, switchMap } from 'rxjs/operators';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CertificatesBottomsheetComponent } from '../certificates-bottomsheet/certificates-bottomsheet.component';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-movies-discover-filters',
  templateUrl: './movies-discover-filters.component.html',
  styleUrls: ['./movies-discover-filters.component.css']
})
export class MoviesDiscoverFiltersComponent implements OnInit, OnDestroy {

  // Form Controls (Reactive Forms Model)
  frmCtrl_genres = new FormControl();
  frmCtrl_country = new FormControl();
  frmCtrl_language = new FormControl();

  // languages data
  languages;
  filteredOptions_Languages;

  // certification data
  certifications;
  certificatesOfSelectedCountry;

  subscription: Subscription;

  constructor(private moviesService: TmdbMoviesService, private _bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.moviesService.GetLanguages();
    this.moviesService.GetGenres();
    this.moviesService.GetCertifications();
    this.moviesService.certificationsResult$.pipe(take(1)).subscribe(res => {
      this.certifications = res;
    });
    this.moviesService.languagesResult$.pipe(take(1)).subscribe(res => {
      this.languages = res;
    });

    // Filter the autocomplete list as per user input
    this.subscription = this.frmCtrl_language.valueChanges
      .subscribe(value => {
        if (value && (typeof (value) == 'string')) {
          this.filteredOptions_Languages = this._filterLanguages(value);
          this.moviesService.with_original_language = null;
        }
        else this.moviesService.with_original_language = value.iso_639_1;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // Apply all filters from form to discover movies
  applyFilters() {
    this.moviesService.with_genres = this.frmCtrl_genres.value ? Array.prototype.map.call(this.frmCtrl_genres.value, s => s.id).toString() : null;

    this.moviesService.getMoviesDiscover_Filter(1);
  }

  // Filter languages in autocomplete box
  private _filterLanguages(value: string): any {
    const filterValue = value.toLowerCase();
    return this.languages.filter(option => option.english_name.toLowerCase().startsWith(filterValue));
  }
  displayFn(selectedLanguage?: any): string | undefined {
    //console.log(selectedLanguage ? selectedLanguage.english_name : undefined);

    return selectedLanguage ? selectedLanguage.english_name : undefined
  }

  // On change of the country enable certificate dropdown and show bottom sheet with certificates of selected country
  countryChanged($event) {
    if (this.certifications && $event && $event.value) {
      for (let key in this.certifications[0]) {
        if (key == $event.value) {
          this.certificatesOfSelectedCountry = this.certifications[0][key];
          this.openCertificatesBottomSheet(key, this.certificatesOfSelectedCountry);
          break;
        }
      }
    }
    else {
      this.moviesService.certification_country = null;
      this.moviesService.certification = null;
    }
  }

  // Opens Certificates Bottom Sheet
  openCertificatesBottomSheet(selectedCountry, certificatesOfSelectedCountry): void {
    this._bottomSheet.open(CertificatesBottomsheetComponent, {
      data: { 'selectedCountry': selectedCountry, 'certificates': certificatesOfSelectedCountry },
    });
  }

}
