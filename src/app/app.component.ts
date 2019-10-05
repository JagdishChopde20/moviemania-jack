import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TmdbMoviesService } from 'src/app/shared/services/tmdb-movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Jacks MovieMania';
  
  isHandset$: Observable<boolean> = this.moviesService.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private moviesService: TmdbMoviesService) { }

  ngOnInit() {
    // get the lastly stoared user theme preference and set it as current theme
    let userTheme = localStorage.getItem("isLightTheme");
    this.moviesService.isLightTheme = (userTheme && userTheme == 'true') ? true : false;
  }

  changeTheme() {
    this.moviesService.isLightTheme = !this.moviesService.isLightTheme;
    // store theme preference in local storage for persistance
    if (this.moviesService.isLightTheme) localStorage.setItem('isLightTheme', 'true');
    else localStorage.setItem('isLightTheme', 'false');
  }
}
