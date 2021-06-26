import { Component, OnInit, Input, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TmdbMoviesService } from 'src/app/shared/services/tmdb-movies.service';

@Component({
  selector: 'app-movie-details-videos',
  templateUrl: './movie-details-videos.component.html',
  styleUrls: ['./movie-details-videos.component.css']
})
export class MovieDetailsVideosComponent implements OnInit {
  @Input('movieVideos') movieVideos: any;

  movieVideoUrls = [];

  constructor(private sanitizer: DomSanitizer, public moviesService: TmdbMoviesService) { }

  ngOnInit() {
    for(let video of this.movieVideos) {
      let safeUrl = this.getVideoYouTubeUrl(video.key);
      this.movieVideoUrls.push(safeUrl);
    }
  }

  getVideoYouTubeUrl(videoId) {
    let url = 'https://www.youtube.com/embed/' + videoId + '?rel=0';
    //let videoUrl: string = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(url));
    let videoUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + videoId + '?rel=0');
    return videoUrl;
  }
}
