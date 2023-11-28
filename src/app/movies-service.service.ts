import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { moviesData } from 'src/assets/movielist';
import { Movie } from './movies.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesServiceService {
  public movies: Movie[] = moviesData;

  constructor() { }

  public getMoviesData() {
    return of(this.movies);
  }
}
