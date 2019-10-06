import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesDetailsComponent } from './core/movies-details/movies-details.component';
import { DiscoverMoviesComponent } from './core/discover-movies/discover-movies.component';
import { MoviesDiscoverFiltersComponent } from './sidebar/movies-discover-filters/movies-discover-filters.component';
import { MoviesListComponent } from './core/movies-list/movies-list.component';


const routes: Routes = [
  // { path: '',   redirectTo: '/core', pathMatch: 'full' },
  { path: '', component: MoviesListComponent },
  {
    path: '',
    component: MoviesDiscoverFiltersComponent,
    outlet: "sidebar"
  },
  
  // { path: 'movies-details/:id', component: MoviesDetailsComponent },
  // { path: '', component: MoviesListComponent },
  // { path: '**', component: MoviesListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
