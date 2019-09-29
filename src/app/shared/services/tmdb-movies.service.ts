import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TmdbMoviesService {

  imageBaseUrl = "http://image.tmdb.org/t/p/";

  MoviesDiscoverUrl = "https://api.themoviedb.org/3/discover/movie?api_key=fa95cddfa25a27f18e30bbdbd383054b&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=1";

  constructor(private http: HttpClient) { }

  // Get Properties
  get imageBaseUrl_w300(): string {
    return this.imageBaseUrl + "w300"
  }

  get imageBaseUrl_w780(): string {
    return this.imageBaseUrl + "w780"
  }

  get imageBaseUrl_w1280(): string {
    return this.imageBaseUrl + "w1280"
  }

  get imageBaseUrl_original(): string {
    return this.imageBaseUrl + "original"
  }

  getMoviesDiscover() {
    return this.http
    .get(this.MoviesDiscoverUrl)
    .pipe(map(data => _.values(data['results'])));
  }
}
