import { Component, OnInit } from '@angular/core';
import { TmdbMoviesService } from 'src/app/shared/services/tmdb-movies.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.component.html',
  styleUrls: ['./movies-details.component.css']
})
export class MoviesDetailsComponent implements OnInit {
  result: any;

  constructor(private moviesService: TmdbMoviesService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    let movieId = this.route.snapshot.params.id;

    this.moviesService.discoverResult$.subscribe(
      res => {
        this.result = res.filter(x => x.id == movieId)[0];
        console.log(this.result);
      }
    );
  }

}
