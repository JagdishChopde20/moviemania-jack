import { Component, OnInit, Input } from '@angular/core';
import { TmdbMoviesService } from '../../services/tmdb-movies.service';

@Component({
  selector: 'app-movie-details-reviews',
  templateUrl: './movie-details-reviews.component.html',
  styleUrls: ['./movie-details-reviews.component.css']
})
export class MovieDetailsReviewsComponent implements OnInit {
  @Input('movieId') movieId: string;
  results$;

  constructor(private moviesService: TmdbMoviesService) { }

  ngOnInit() {
    this.results$ = this.moviesService.GetMovieReviewsByModieId(this.movieId);
  }

}
