import { Component, OnInit, Input } from '@angular/core';
import { TmdbMoviesService } from '../../services/tmdb-movies.service';

@Component({
  selector: 'app-movie-details-images',
  templateUrl: './movie-details-images.component.html',
  styleUrls: ['./movie-details-images.component.css']
})
export class MovieDetailsImagesComponent implements OnInit {
  @Input('movieImages') movieImages: any;

  constructor(public moviesService: TmdbMoviesService) { }

  ngOnInit() {
  }

}
