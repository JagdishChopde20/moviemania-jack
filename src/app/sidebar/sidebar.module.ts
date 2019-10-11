import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesDiscoverFiltersComponent } from '../sidebar/movies-discover-filters/movies-discover-filters.component';
import { SharedModule } from '../shared/shared.module';
import { DatePipe } from '@angular/common';
import { CertificatesBottomsheetComponent } from '../shared/components/certificates-bottomsheet/certificates-bottomsheet.component';
import { TmdbMoviesService } from '../shared/services/tmdb-movies.service';
import { MovieListSidebarComponent } from '../sidebar/movie-list-sidebar/movie-list-sidebar.component';

// Year DatePicker
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DialogAdultConfirmComponent } from '../shared/components/dialog-adult-confirm/dialog-adult-confirm.component';
import { Routes, RouterModule } from '@angular/router';

// const routes: Routes = [
//   {
//     path: 'movies-sidebar/:id',
//     component: MovieListSidebarComponent,
//     outlet: "sidebar"
//   },
// ];

@NgModule({
  declarations: [
    MoviesDiscoverFiltersComponent, 
    DialogAdultConfirmComponent,
    CertificatesBottomsheetComponent, 
    MovieListSidebarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatMomentDateModule,
    RouterModule.forChild([]),
  ],
  exports: [
    MoviesDiscoverFiltersComponent,
  ],
  providers: [
    TmdbMoviesService,
    DatePipe
  ],
  entryComponents: [
    CertificatesBottomsheetComponent,
    DialogAdultConfirmComponent
  ]
})
export class SidebarModule { }
