import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as myGlobals from '../globals';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TmdbMoviesService {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private datepipe: DatePipe) { }

  // Get Properties
  get imageBaseUrl_w300(): string {
    return myGlobals.imageBaseUrl + "w300"
  }

  get imageBaseUrl_w780(): string {
    return myGlobals.imageBaseUrl + "w780"
  }

  get imageBaseUrl_w1280(): string {
    return myGlobals.imageBaseUrl + "w1280"
  }

  get imageBaseUrl_original(): string {
    return myGlobals.imageBaseUrl + "original"
  }

  // Results
  discoverResult$: Observable<any>;
  genresResult$: Observable<any>;
  certificationsResult$: Observable<any>;

  // Filter variables
  page: number;
  total_results: number;
  total_pages: number;
  with_genres: string;
  include_adult: string;
  certification_country: string;
  certification: string;
  primary_release_date_gte: Date;
  primary_release_date_lte: Date;

  // Private Methods
  private getMoviesDiscover_FromServer(url) {
    return this.http
      .get(url)
      .pipe(map(data => {
        this.page = data['page'];
        this.total_results = data['total_results'];
        this.total_pages = data['total_pages'];

        let snackBarMsg = "Total: " + this.total_results + " | Showing page " + this.page + "/" + this.total_pages + ".";
        this._snackBar.open(snackBarMsg, 'CLOSE', {
          duration: 3000,
        });

        return _.values(data['results'])
      }
      ));

  }

  // Public Methods
  getMoviesDiscover_Filter(page = this.page, genres = this.with_genres, adult = this.include_adult, country = this.certification_country) {
    // set filters
    if (!page && page != 0) this.page = page;
    this.with_genres = genres;
    this.include_adult = adult;
    this.certification_country = country;

    console.log(this.primary_release_date_gte);
    console.log(this.primary_release_date_lte);

    let primary_release_date_gte_formatted = (this.primary_release_date_gte ?  this.datepipe.transform(this.primary_release_date_gte, 'yyyy-MM-dd') : null);
    let primary_release_date_lte_formatted = (this.primary_release_date_lte ? this.datepipe.transform(this.primary_release_date_lte, 'yyyy-MM-dd') : null);
    console.log(primary_release_date_gte_formatted);
    console.log(primary_release_date_lte_formatted);

    let moviesDiscoverUrl = myGlobals.apiBaseUrl + "discover/movie?api_key=" + myGlobals.apiKey +
      "&language=en-US&sort_by=popularity.desc&include_video=true&page=" + this.page
      + ((adult) ? '&include_adult=true' : '&include_adult=false')
      + ((genres && genres != '') ? '&with_genres=' + this.with_genres : '')
      + ((this.certification_country && this.certification_country != '' && this.certification && this.certification != '') ? '&certification_country=' + this.certification_country + '&certification=' + this.certification : '')
      + ((primary_release_date_gte_formatted && primary_release_date_gte_formatted != '') ? '&primary_release_date.gte=' + primary_release_date_gte_formatted : '')
      + ((primary_release_date_lte_formatted && primary_release_date_lte_formatted != '') ? '&primary_release_date.lte=' + primary_release_date_lte_formatted : '')
      ;


    console.log(moviesDiscoverUrl);

    this.discoverResult$ = this.getMoviesDiscover_FromServer(moviesDiscoverUrl);
  }

  getNextPage() {
    if (this.page < this.total_pages) this.getMoviesDiscover_Filter(++this.page);
  }

  getPreviousPage() {
    if (this.page > 1) this.getMoviesDiscover_Filter(--this.page);
  }

  // Get genres
  GetGenres() {
    let genre_url = myGlobals.apiBaseUrl + "genre/movie/list?api_key=" + myGlobals.apiKey + "&language=en-US";

    this.genresResult$ = this.http.get(genre_url).pipe(map(data => _.values(data['genres'])));
  }

  // Get certification
  GetCertifications() {
    let certification_url = myGlobals.apiBaseUrl + "certification/movie/list?api_key=" + myGlobals.apiKey;

    this.certificationsResult$ = this.http.get(certification_url).pipe(map(data => _.values(data)));
  }
}
