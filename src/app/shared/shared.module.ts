import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TmdbMoviesService } from './services/tmdb-movies.service';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule, MatNativeDateModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CertificationKeysPipe } from './pipes/certification-keys.pipe';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { ChipsKeywordsComponent } from './components/chips-keywords/chips-keywords.component';
import { YearPickerComponent } from './components/year-picker/year-picker.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MovieDetailsOverviewComponent } from './components/movie-details-overview/movie-details-overview.component';
import { MovieDetailsVideosComponent } from './components/movie-details-videos/movie-details-videos.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MovieDetailsImagesComponent } from './components/movie-details-images/movie-details-images.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MoviesGridViewComponent } from './components/movies-grid-view/movies-grid-view.component';
import { MoviesTableViewComponent } from './components/movies-table-view/movies-table-view.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MovieDetailsCreditsComponent } from './components/movie-details-credits/movie-details-credits.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent, 
    CertificationKeysPipe, 
    ChipsKeywordsComponent, 
    YearPickerComponent, 
    MovieDetailsOverviewComponent, 
    MovieDetailsVideosComponent, 
    MovieDetailsImagesComponent, 
    MoviesGridViewComponent, 
    MoviesTableViewComponent, 
    MovieDetailsCreditsComponent, 
  ],
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
    MatSnackBarModule,
    MatBottomSheetModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatDialogModule,
    MatGridListModule,
    MatTabsModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    LoadingSpinnerComponent,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatToolbarModule,
    MatListModule,
    MatSelectModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatDialogModule,
    CertificationKeysPipe,
    ChipsKeywordsComponent,
    MovieDetailsOverviewComponent,
    MovieDetailsVideosComponent,
    MovieDetailsImagesComponent,
    YearPickerComponent, 
    MoviesGridViewComponent,
    MoviesTableViewComponent, 
    MovieDetailsCreditsComponent
  ],
  providers: [
    TmdbMoviesService,
  ]
})
export class SharedModule { }
