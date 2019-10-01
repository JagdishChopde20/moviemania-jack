import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesHomeComponent } from './movies-home/movies-home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DiscoverMoviesComponent } from './discover-movies/discover-movies.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MoviesDetailsComponent } from './movies-details/movies-details.component';

@NgModule({
  declarations: [MoviesHomeComponent, DiscoverMoviesComponent, MoviesDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([]),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSlideToggleModule,
    MatCardModule
  ]
})
export class CoreModule { }
