import { Component, OnInit } from '@angular/core';
import { TmdbMoviesService } from 'src/app/shared/services/tmdb-movies.service';

@Component({
  selector: 'app-movies-home',
  templateUrl: './movies-home.component.html',
  styleUrls: ['./movies-home.component.css']
})
export class MoviesHomeComponent implements OnInit {
  results$: any;

  constructor(private moviesService: TmdbMoviesService) { }

  ngOnInit() {
    this.results$ = this.moviesService.getMoviesDiscover();
  }

}
