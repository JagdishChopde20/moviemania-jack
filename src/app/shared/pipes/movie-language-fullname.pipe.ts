import { Pipe, PipeTransform } from '@angular/core';
import { TmdbMoviesService } from '../services/tmdb-movies.service';

@Pipe({
  name: 'movieLanguageFullname'
})
export class MovieLanguageFullnamePipe implements PipeTransform {

  constructor(private moviesService: TmdbMoviesService) { }

  transform(value: any, ...args: any[]): any {
    if (this.moviesService.languagesResult)
      return this.moviesService.languagesResult.filter(x => x.iso_639_1 == value)[0].name;
    else {
      this.moviesService.GetLanguages();
      return "English";
    }
  }

}
