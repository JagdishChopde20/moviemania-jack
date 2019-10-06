import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbMoviesService } from 'src/app/shared/services/tmdb-movies.service';

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.component.html',
  styleUrls: ['./movies-details.component.css']
})
export class MoviesDetailsComponent implements OnInit {
  movieId;
  result$: any;

  constructor(private route: ActivatedRoute, private moviesService: TmdbMoviesService) { }

  ngOnInit() {
    this.movieId = this.route.snapshot.params.id;

    if (this.movieId) {
      this.result$ = this.moviesService.GetMovieDetails(this.movieId);
    }
  }

}
