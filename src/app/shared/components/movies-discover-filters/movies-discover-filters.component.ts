import { Component, OnInit } from '@angular/core';
import { TmdbMoviesService } from 'src/app/shared/services/tmdb-movies.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-movies-discover-filters',
  templateUrl: './movies-discover-filters.component.html',
  styleUrls: ['./movies-discover-filters.component.css']
})
export class MoviesDiscoverFiltersComponent implements OnInit {
  frmCtrl_genres = new FormControl();
  frmCtrl_adult = new FormControl();

  constructor(private moviesService: TmdbMoviesService) { }

  ngOnInit() {
    this.moviesService.GetGenres();
  }

  applyFilters() {
    let genres = this.frmCtrl_genres.value ? Array.prototype.map.call(this.frmCtrl_genres.value, s => s.id).toString() : null;
    console.log(genres);
    this.moviesService.getMoviesDiscover_Filter(1, genres, this.frmCtrl_adult.value);
  }
}
