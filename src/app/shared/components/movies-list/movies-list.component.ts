import { Component, OnInit, OnDestroy } from '@angular/core';
import { TmdbMoviesService } from 'src/app/shared/services/tmdb-movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit, OnDestroy {
  results: any;

  constructor(private moviesService: TmdbMoviesService) { }

  ngOnInit() {
    this.moviesService.getMoviesDiscover_Filter();
  }

  ngOnDestroy() {
  }

  nextPage() {
    this.moviesService.getNextPage();
  }

  previousPage() {
    this.moviesService.getPreviousPage();
  }
}
