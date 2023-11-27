import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MoviesServiceService } from '../movies-service.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})
export class MoviesListComponent implements OnInit, OnChanges {
  public newList: any;
  public moviesList: any;
  public oneMovie: any;
  public movieDetails: any;
  public filteredAction: any;

  @Input() set filteredValue(value: any) {
    this.filteredAction = value;
    console.log(this.filteredAction);
  }

  constructor(private movieService: MoviesServiceService) {}

  ngOnInit() {
    console.log(this.filteredValue);
    this.movieService.getMoviesData().subscribe((newMovieList) => {
      this.moviesList = newMovieList;
      this.newList = this.moviesList;
      this.oneMovie = newMovieList[0];
    });

    console.log(this.newList);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.newList = this.moviesList;
    console.log(changes['filteredValue'].currentValue);
    const applyFilterValue =
      changes['filteredValue'].currentValue.toLowerCase();
      console.log(applyFilterValue)
    this.newList = this.newList.filter((newMovie: any) => {
      return (
        newMovie.year.toString().toLowerCase() ===
          applyFilterValue.toLowerCase() ||
        newMovie?.info?.genres?.includes(applyFilterValue)
      );
    });
    console.log(this.newList);
  }

  onCardClick(movie: any) {
    this.movieDetails = movie;
    console.log(movie);
  }
}
