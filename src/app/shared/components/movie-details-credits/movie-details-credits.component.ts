import { Component, OnInit, Input } from '@angular/core';
import { TmdbMoviesService } from '../../services/tmdb-movies.service';

@Component({
  selector: 'app-movie-details-credits',
  templateUrl: './movie-details-credits.component.html',
  styleUrls: ['./movie-details-credits.component.css']
})
export class MovieDetailsCreditsComponent implements OnInit {
  @Input('movieId') movieId;
  results$;

  constructor(private moviesService: TmdbMoviesService) { }

  ngOnInit() {
     this.results$ = this.moviesService.GetMovieCredits(this.movieId);
  }

}
