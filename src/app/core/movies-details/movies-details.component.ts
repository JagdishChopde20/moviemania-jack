import { Component, OnInit } from '@angular/core';
import { TmdbMoviesService } from 'src/app/shared/services/tmdb-movies.service';

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.component.html',
  styleUrls: ['./movies-details.component.css']
})
export class MoviesDetailsComponent implements OnInit {
  results: any;

  constructor(private moviesService: TmdbMoviesService) { }

  ngOnInit() {  
    this.moviesService.discoverResult.subscribe(
      res => {
        console.log(res);

        this.results = res.filter(x => x.id == 429617);
        console.log(this.results);

      }
    );
}

}
