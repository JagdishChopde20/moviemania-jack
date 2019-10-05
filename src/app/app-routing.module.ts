import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesDetailsComponent } from './core/movies-details/movies-details.component';
import { DiscoverMoviesComponent } from './core/discover-movies/discover-movies.component';
import { MoviesDiscoverFiltersComponent } from './sidebar/movies-discover-filters/movies-discover-filters.component';
import { MoviesListComponent } from './core/movies-list/movies-list.component';


const routes: Routes = [
  { path: '', component: MoviesListComponent },
  {
    path: '',
    component: MoviesDiscoverFiltersComponent,
    outlet: "sidebar"
  },
  {
    path: "movies-sidebar",
    component: MoviesDiscoverFiltersComponent,
    outlet: "sidebar"
  },
  { path: 'movies-details/:id', component: MoviesDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
