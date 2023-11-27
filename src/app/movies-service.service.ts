import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { moviesData } from 'src/assets/movielist';

@Injectable({
  providedIn: 'root',
})
export class MoviesServiceService {
  public movies = moviesData;

  constructor() {}

  public getMoviesData() {
    return of(this.movies);
  }
}
