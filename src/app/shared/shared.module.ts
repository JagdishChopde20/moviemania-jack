import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TmdbMoviesService } from './services/tmdb-movies.service';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { MoviesDiscoverFiltersComponent } from './components/movies-discover-filters/movies-discover-filters.component';
import { MoviesListComponent } from '../shared/components/movies-list/movies-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [LoadingSpinnerComponent, MoviesDiscoverFiltersComponent, MoviesListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatSelectModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSnackBarModule
  ],
  exports: [
    LoadingSpinnerComponent,
    MoviesListComponent,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MoviesDiscoverFiltersComponent,
    MatSlideToggleModule,
    MatSnackBarModule
  ],
  providers: [
    TmdbMoviesService
  ]
})
export class SharedModule { }
