import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TmdbMoviesService } from 'src/app/shared/services/tmdb-movies.service';
import {Location} from '@angular/common';

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

  constructor(private breakpointObserver: BreakpointObserver, private moviesService: TmdbMoviesService, private _location: Location) { }

  ngOnInit() {
    // get the lastly stoared user theme preference and set it as current theme
    let userTheme = localStorage.getItem("isLightTheme");
    this.moviesService.isLightTheme = (userTheme && userTheme == 'true') ? true : false;
  }

  changeTheme(themeName) {
    // store theme preference in local storage for persistance
    if (themeName == 'dark' && this.moviesService.isLightTheme) {
      this.moviesService.isLightTheme = false;
      localStorage.setItem('isLightTheme', 'false');
    }
    else if (themeName == 'light' && !this.moviesService.isLightTheme){
      this.moviesService.isLightTheme = true;
      localStorage.setItem('isLightTheme', 'true');
    }
  }

  goBack() {
    this._location.back();
  }
}
