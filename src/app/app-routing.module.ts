import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesDetailsComponent } from './core/movies-details/movies-details.component';
import { DiscoverMoviesComponent } from './core/discover-movies/discover-movies.component';
import { MoviesDiscoverFiltersComponent } from './sidebar/movies-discover-filters/movies-discover-filters.component';
import { MoviesListComponent } from './core/movies-list/movies-list.component';
import { MovieListSidebarComponent } from './sidebar/movie-list-sidebar/movie-list-sidebar.component';


const routes: Routes = [
  { path: '', redirectTo: '/core', pathMatch: 'full' },

  { path: 'core', component: MoviesListComponent },

  { path: '', component: MovieListSidebarComponent, outlet: "sidebar" },
  { path: 'movies-sidebar', component: MovieListSidebarComponent, outlet: "sidebar" },
  { path: 'movies-sidebar/:id', component: MovieListSidebarComponent, outlet: "sidebar" },

  { path: 'discover-filters', component: MoviesDiscoverFiltersComponent, outlet: "sidebar" },

  { path: 'movies-details/:id', component: MoviesDetailsComponent },

  { path: '**', component: MoviesListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
