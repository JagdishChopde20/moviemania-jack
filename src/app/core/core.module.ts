import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesHomeComponent } from './movies-home/movies-home.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DiscoverMoviesComponent } from './discover-movies/discover-movies.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MoviesDetailsComponent } from './movies-details/movies-details.component';
import { MoviesListComponent } from '../core/movies-list/movies-list.component';
import { MatTabsModule } from '@angular/material/tabs';

// const routes: Routes = [
//   { path: 'core', component: MoviesListComponent },
//   { path: 'movies-details/:id', component: MoviesDetailsComponent },
// ];

@NgModule({
    
    declarations: [MoviesHomeComponent, DiscoverMoviesComponent, MoviesDetailsComponent, MoviesListComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([]),
    LayoutModule,
    MatSidenavModule,
    MatTabsModule
  ],
  exports: [
    MoviesListComponent
  ]
})
export class CoreModule { }
