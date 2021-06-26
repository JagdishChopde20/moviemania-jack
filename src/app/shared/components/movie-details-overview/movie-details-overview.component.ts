import { Component, OnInit, Input } from '@angular/core';
import { TmdbMoviesService } from 'src/app/shared/services/tmdb-movies.service';

@Component({
  selector: 'app-movie-details-overview',
  templateUrl: './movie-details-overview.component.html',
  styleUrls: ['./movie-details-overview.component.css']
})
export class MovieDetailsOverviewComponent implements OnInit {
  @Input('movieOverview') movieOverview: any;

  constructor(public moviesService: TmdbMoviesService) { }

  ngOnInit() {  
  }
}
