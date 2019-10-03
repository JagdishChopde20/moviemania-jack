import { Component, OnInit } from '@angular/core';
import { TmdbMoviesService } from 'src/app/shared/services/tmdb-movies.service';
import { FormControl } from '@angular/forms';
import { take } from 'rxjs/operators';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CertificatesBottomsheetComponent } from '../certificates-bottomsheet/certificates-bottomsheet.component';

@Component({
  selector: 'app-movies-discover-filters',
  templateUrl: './movies-discover-filters.component.html',
  styleUrls: ['./movies-discover-filters.component.css']
})
export class MoviesDiscoverFiltersComponent implements OnInit {

  // Form Controls (Reactive Forms Model)
  frmCtrl_genres = new FormControl();
  frmCtrl_adult = new FormControl();
  frmCtrl_country = new FormControl();

  // certification data
  certifications;
  certificatesOfSelectedCountry;

  constructor(private moviesService: TmdbMoviesService, private _bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.moviesService.GetGenres();
    this.moviesService.GetCertifications();
    this.moviesService.certificationsResult$.pipe(take(1)).subscribe(res => {
      this.certifications = res;
    });
  }

  applyFilters() {
    let genres = this.frmCtrl_genres.value ? Array.prototype.map.call(this.frmCtrl_genres.value, s => s.id).toString() : null;

    this.moviesService.getMoviesDiscover_Filter(1, genres, this.frmCtrl_adult.value, this.frmCtrl_country.value);

  }

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

  onClickOfCertificateField() {
    console.log(this.moviesService.certification);
  }

  openCertificatesBottomSheet(selectedCountry, certificatesOfSelectedCountry): void {
    this._bottomSheet.open(CertificatesBottomsheetComponent, {
      data: { 'selectedCountry': selectedCountry, 'certificates': certificatesOfSelectedCountry },
    });
  }

}
