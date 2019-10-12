import { Component, OnInit, OnDestroy, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { TmdbMoviesService } from 'src/app/shared/services/tmdb-movies.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAdultConfirmComponent } from '../../shared/components/dialog-adult-confirm/dialog-adult-confirm.component';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
  // Need to remove view encapsulation so that the custom tooltip style defined in
  // `tooltip-custom-class-example.css` will not be scoped to this component's view.
  encapsulation: ViewEncapsulation.None,
})
export class MoviesListComponent implements OnInit, OnDestroy {
  results: any;
  isGridView: boolean;

  constructor(private moviesService: TmdbMoviesService, public dialog: MatDialog) { }

  ngOnInit() {
    // Load discover as initial movies
    if (!this.moviesService.discoverResult$)
      this.moviesService.getMoviesDiscover_Filter(1);

      // get the lastly stoared user view preference and set it as current view (gridview or listview)
    let userView = localStorage.getItem("isGridView");
    this.isGridView = (userView && userView == 'false') ? false : true;
  }

  ngOnDestroy() {
  }

  nextPage() {
    this.moviesService.getNextPage();
    window.scrollTo(0, 0);
  }

  previousPage() {
    this.moviesService.getPreviousPage();
    window.scrollTo(0, 0);
  }

  searchMovies() {
    if (this.moviesService.searchQuery && this.moviesService.searchQuery != '') {
      this.moviesService.getMoviesSearch_Filter(1);
    }
  }

  switchView(viewValue) {
    if(viewValue == 'grid') {
      this.isGridView = true;
      localStorage.setItem('isGridView', 'true');
    }
    else {
      this.isGridView = false;
      localStorage.setItem('isGridView', 'false');
    }
  }

  
  changeAdultFilter(): void {
    if (this.moviesService.include_adult) {
      this.moviesService.include_adult = false;
      return;
    }

    const dialogRef = this.dialog.open(DialogAdultConfirmComponent, {
      width: '',
      data: { title: 'Enable Adult Content', text: 'Please provide your birthdate to proceed' }
    });

    dialogRef.afterClosed().subscribe(result => {   
      if (result) {
        let dateDiff = new Date().getFullYear() - new Date(result).getFullYear();
        if (dateDiff >= 18) {
          this.moviesService.include_adult = true;
          alert('Adult content enabled as you are above 18 year old.')
        }
        else {
          this.moviesService.include_adult = false;
          alert('Sorry! Adult content allowed for above 18 year old only.');
        }
      }
      else {
        this.moviesService.include_adult = false;
      }
    });
  }
}
