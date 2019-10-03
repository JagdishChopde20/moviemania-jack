import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { TmdbMoviesService } from '../../services/tmdb-movies.service';

@Component({
  selector: 'app-certificates-bottomsheet',
  templateUrl: './certificates-bottomsheet.component.html',
  styleUrls: ['./certificates-bottomsheet.component.css']
})
export class CertificatesBottomsheetComponent implements OnInit {

  constructor(private _bottomSheetRef: MatBottomSheetRef<CertificatesBottomsheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) private certificatesData: any,
    private moviesService: TmdbMoviesService) { }

  ngOnInit() {
  }

  openLink(event: MouseEvent, certificate: any): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();

    // set the selected certification to service filter object
    this.moviesService.certification = certificate.certification;
  }
}
