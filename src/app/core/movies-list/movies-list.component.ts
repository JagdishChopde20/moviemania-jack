import { Component, OnInit, OnDestroy, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { TmdbMoviesService } from 'src/app/shared/services/tmdb-movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
  // Need to remove view encapsulation so that the custom tooltip style defined in
  // `tooltip-custom-class-example.css` will not be scoped to this component's view.
  encapsulation: ViewEncapsulation.None,
})
export class MoviesListComponent implements OnInit, OnDestroy {
  results: any;

  constructor(private moviesService: TmdbMoviesService) { }

  ngOnInit() {
    // Load discover as initial movies
    if (!this.moviesService.discoverResult$)
      this.moviesService.getMoviesDiscover_Filter(1);
  }

  ngOnDestroy() {
  }

  nextPage() {
    this.moviesService.getNextPage();
  }

  previousPage() {
    this.moviesService.getPreviousPage();
  }

  searchMovies() {
    if (this.moviesService.searchQuery && this.moviesService.searchQuery != '') {
      this.moviesService.getMoviesSearch_Filter(1);
    }
  }
}
