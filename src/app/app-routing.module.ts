import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesHomeComponent } from './core/movies-home/movies-home.component';


const routes: Routes = [
  { path: '', component: MoviesHomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
