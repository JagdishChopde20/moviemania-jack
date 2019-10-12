import { Component, OnInit, Input } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { TmdbMoviesService } from '../../services/tmdb-movies.service';

@Component({
  selector: 'app-movies-table-view',
  templateUrl: './movies-table-view.component.html',
  styleUrls: ['./movies-table-view.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MoviesTableViewComponent implements OnInit {
  @Input('results') results: any;

  dataSource;
  columnsToDisplay = ['title', 'release_date'];
  expandedElement: MovieElement | null;

  ELEMENT_DATA: MovieElement[] = [];

  constructor(private moviesService: TmdbMoviesService) { }

  ngOnInit() {
    this.ELEMENT_DATA = this.results;
    this.dataSource = this.ELEMENT_DATA;
  }
}

export interface MovieElement {  
}
