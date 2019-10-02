import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-discover-movies',
  templateUrl: './discover-movies.component.html',
  styleUrls: ['./discover-movies.component.css']
})
export class DiscoverMoviesComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  toggleTheme: boolean = false;
  
  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
  }

  changeTheme() {
    this.toggleTheme = !this.toggleTheme;
  }
}
