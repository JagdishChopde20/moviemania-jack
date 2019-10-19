import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as myGlobals from '../globals';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TmdbMoviesService {
  isHandset$: Observable<boolean>;
  isLightTheme: boolean;

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
  moviesUrl: string;

  discoverResult$: Observable<any>;
  languagesResult$: Observable<any>;
  genresResult$: Observable<any>;
  certificationsResult$: Observable<any>;
  languagesResult: any;

  // filters - search movies
  searchQuery: string;
  primary_release_year: any;

  // filters - discover movies
  page: number;
  total_results: number;
  total_pages: number;
  with_genres: string;
  include_adult: boolean;
  certification_country: string;
  certification: string;
  primary_release_date_gte: Date;
  primary_release_date_lte: Date;
  with_original_language: string;
  with_keywords: string;
  keywords: any = [];


  // Private Methods
  private getMovies_FromServer(url) {
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

  // Discover Movies
  getMoviesDiscover_Filter(page: number) {
    // set filters
    this.page = (page && page > 0) ? page : 1;

    let primary_release_date_gte_formatted = (this.primary_release_date_gte ? this.datepipe.transform(this.primary_release_date_gte, 'yyyy-MM-dd') : null);
    let primary_release_date_lte_formatted = (this.primary_release_date_lte ? this.datepipe.transform(this.primary_release_date_lte, 'yyyy-MM-dd') : null);

    if (this.keywords) {
      // push ids of keywords into an string array
      var newArray: string[] = [];
      for (let keyword of this.keywords) {
        newArray.push(keyword['id']);
      }
      this.with_keywords = newArray.join(',');
    }

    this.moviesUrl = myGlobals.apiBaseUrl + "discover/movie?api_key=" + myGlobals.apiKey +
      "&language=en-US&sort_by=popularity.desc&include_video=true"
      + ((this.include_adult) ? '&include_adult=true' : '&include_adult=false')
      + ((this.with_genres && this.with_genres != '') ? '&with_genres=' + this.with_genres : '')
      + ((this.certification_country && this.certification_country != '' && this.certification && this.certification != '') ? '&certification_country=' + this.certification_country + '&certification=' + this.certification : '')
      + ((primary_release_date_gte_formatted && primary_release_date_gte_formatted != '') ? '&primary_release_date.gte=' + primary_release_date_gte_formatted : '')
      + ((primary_release_date_lte_formatted && primary_release_date_lte_formatted != '') ? '&primary_release_date.lte=' + primary_release_date_lte_formatted : '')
      + ((this.with_original_language && this.with_original_language != '') ? '&with_original_language=' + this.with_original_language : '')
      + ((this.with_keywords && this.with_keywords != '') ? '&with_keywords=' + this.with_keywords : ''
        + "&page=" + this.page
      );

    console.log(this.moviesUrl);

    this.discoverResult$ = this.getMovies_FromServer(this.moviesUrl);
    this.searchQuery = null;
  }

  // Search Movies
  getMoviesSearch_Filter(page: number) {
    // set filters
    this.page = (page && page > 0) ? page : 1;

    this.moviesUrl = myGlobals.apiBaseUrl + "search/movie?api_key=" + myGlobals.apiKey
      + ((this.searchQuery && this.searchQuery != '') ? '&query=' + this.searchQuery : '')
      + ((this.with_original_language && this.with_original_language != '') ? '&language=' + this.with_original_language : '&language=en-US')
      + ((this.include_adult) ? '&include_adult=true' : '&include_adult=false')
      + ((this.primary_release_year && this.primary_release_year._i && this.primary_release_year._i.year) ? '&primary_release_year=' + this.primary_release_year._i.year : '')
      + "&page=" + this.page
      ;

    console.log(this.moviesUrl);

    this.discoverResult$ = this.getMovies_FromServer(this.moviesUrl);
  }

  // Get similar, recommendations, lists Movies
  GetRelatedMoviesByMovieId(movieId: string, categoryName: string) {
    this.moviesUrl = myGlobals.apiBaseUrl + "movie/" + movieId + "/" + categoryName + "?api_key=" + myGlobals.apiKey + "&language=en-US&page=1";
    console.log(this.moviesUrl);

    this.discoverResult$ = this.getMovies_FromServer(this.moviesUrl);
  }

  // Get similar, recommendations, lists Movies
  GetMoviesByCategory(categoryName: string) {
    this.moviesUrl = myGlobals.apiBaseUrl + "movie/" + categoryName + "?api_key=" + myGlobals.apiKey + "&language=en-US&page=1";
    console.log(this.moviesUrl);

    this.discoverResult$ = this.getMovies_FromServer(this.moviesUrl);
  }

  getNextPage() {
    if ((this.page < this.total_pages) && this.moviesUrl) {
      let nextPageUrl = this.moviesUrl.substring(0, this.moviesUrl.lastIndexOf('=') + 1) + (++this.page);
      console.log(nextPageUrl);
      this.discoverResult$ = this.getMovies_FromServer(nextPageUrl);
    }
  }

  getPreviousPage() {
    if ((this.page > 1) && this.moviesUrl) {
      let previousPageUrl = this.moviesUrl.substring(0, this.moviesUrl.lastIndexOf('=') + 1) + (--this.page);
      console.log(previousPageUrl);
      this.discoverResult$ = this.getMovies_FromServer(previousPageUrl);
    }
  }

  // Get Languages
  GetLanguages() {
    let languages_url = myGlobals.apiBaseUrl + "configuration/languages?api_key=" + myGlobals.apiKey;
    this.languagesResult$ = this.http.get(languages_url).pipe(map(data => _.values(data)));

    this.languagesResult$.pipe(take(1)).subscribe(res => {
      this.languagesResult = res;
    });
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

  // Get Keywords
  GetKeywords(query: string) {
    let keywords_url = myGlobals.apiBaseUrl + "search/keyword?api_key=" + myGlobals.apiKey + "&query=" + query + "&page=1";
    return this.http.get(keywords_url).pipe(map(data => _.values(data['results'])));
  }

  // Get Movie Details
  GetMovieDetails(movieId: string) {
    let movieDetails_url = myGlobals.apiBaseUrl + "movie/" + movieId + "?api_key=" + myGlobals.apiKey + "&language=en,null&append_to_response=videos,images";
    return this.http.get(movieDetails_url).pipe(map(data => data));
  }

  // Get Movie Details
  GetMovieCredits(movieId: string) {
    let movieCredits_url = myGlobals.apiBaseUrl + "movie/" + movieId + "/credits?api_key=" + myGlobals.apiKey;
    return this.http.get(movieCredits_url).pipe(map(data => data));
  }

  // Get Movie Reviews
  GetMovieReviewsByModieId(movieId: string) {
    let movieReviews_url = myGlobals.apiBaseUrl + "movie/" + movieId + "/reviews?api_key=" + myGlobals.apiKey;
    return this.http.get(movieReviews_url).pipe(map(data => data));
  }

}
