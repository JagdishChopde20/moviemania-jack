import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesDetailsComponent } from './core/movies-details/movies-details.component';
import { DiscoverMoviesComponent } from './core/discover-movies/discover-movies.component';


const routes: Routes = [
  { path: 'movies-details', component: MoviesDetailsComponent },
  { path: '', component: DiscoverMoviesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
