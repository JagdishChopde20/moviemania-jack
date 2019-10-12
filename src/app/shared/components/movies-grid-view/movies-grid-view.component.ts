import { Component, OnInit, Input } from '@angular/core';
import { TmdbMoviesService } from '../../services/tmdb-movies.service';

@Component({
  selector: 'app-movies-grid-view',
  templateUrl: './movies-grid-view.component.html',
  styleUrls: ['./movies-grid-view.component.css']
})
export class MoviesGridViewComponent implements OnInit {
  @Input('results') results: any;

  constructor(private moviesService: TmdbMoviesService) { }

  ngOnInit() {
  }

}
