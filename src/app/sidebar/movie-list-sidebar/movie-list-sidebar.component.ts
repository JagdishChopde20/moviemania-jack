import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TmdbMoviesService } from 'src/app/shared/services/tmdb-movies.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-list-sidebar',
  templateUrl: './movie-list-sidebar.component.html',
  styleUrls: ['./movie-list-sidebar.component.css']
})
export class MovieListSidebarComponent implements OnInit, OnDestroy {
  movieId;
  subcription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private moviesService: TmdbMoviesService) { }

  ngOnInit() {
    // this.movieId = this.route.snapshot.params.id;
    this.subcription = this.route.paramMap.subscribe(params => {
      this.movieId = params.get('id');
    });
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

  navigateToRelatedMoviesByMovieId(categoryName) {
    this.moviesService.GetRelatedMoviesByMovieId(this.movieId, categoryName);
    this.router.navigate(['', { outlets: { primary: ['core'], sidebar: ['movies-sidebar', this.movieId] } }]);
  }

  navigateToMoviesByCategory(categoryName) {
    this.moviesService.GetMoviesByCategory(categoryName);
    this.router.navigate(['', { outlets: { primary: ['core'], sidebar: ['movies-sidebar'] } }]);
  }
}
