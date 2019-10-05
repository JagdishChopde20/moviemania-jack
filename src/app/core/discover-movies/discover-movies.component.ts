import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TmdbMoviesService } from 'src/app/shared/services/tmdb-movies.service';

@Component({
  selector: 'app-discover-movies',
  templateUrl: './discover-movies.component.html',
  styleUrls: ['./discover-movies.component.css']
})
export class DiscoverMoviesComponent implements OnInit {

  isHandset$: Observable<boolean> = this.moviesService.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  toggleTheme: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver, private moviesService: TmdbMoviesService) { }

  ngOnInit() {
    // get the lastly stoared user theme preference and set it as current theme
    let userTheme = localStorage.getItem("isLightTheme");
    this.toggleTheme = (userTheme && userTheme == 'true') ? true : false;
  }

  changeTheme() {
    this.toggleTheme = !this.toggleTheme;
    // store theme preference in local storage for persistance
    if (this.toggleTheme) localStorage.setItem('isLightTheme', 'true');
    else localStorage.setItem('isLightTheme', 'false');
  }
}
