import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MoviesServiceService } from '../movies-service.service';
import { Movie } from '../movies.model';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})
export class MoviesListComponent implements OnInit, OnChanges {
  public newList!: Movie[];
  public moviesList!: Movie[];
  public oneMovie!: Movie;
  public movieDetails: any;
  public filteredAction: any;
  config: any;
  isSelectedParent!: boolean;
  selectedParent!: number;

  @Input() set filteredValue(value: any) {
    this.filteredAction = value;
    console.log(this.filteredAction);
  }

  constructor(private movieService: MoviesServiceService) { }

  ngOnInit() {
    console.log(this.filteredValue);
    this.movieService.getMoviesData().subscribe((newMovieList : Movie[]) => {
      this.moviesList = newMovieList;
      this.newList = this.moviesList;
      this.oneMovie = newMovieList[0];
    });

    console.log(this.newList);

    this.config = {
      itemsPerPage: 18,
      currentPage: 1,
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    debugger;
    this.newList = this.moviesList;
    const applyFilterValue = changes['filteredValue'].currentValue;

    this.newList = this.newList.filter((newMovie: Movie) => {
      return (
        newMovie.year.toString().toLowerCase() === applyFilterValue.toString().toLowerCase() ||
        newMovie?.info?.genres?.includes(applyFilterValue) || newMovie.title.toLocaleLowerCase().includes(applyFilterValue.toLowerCase())
      );
    });

    console.log(this.newList);
  }

  onCardClick(movie: any) {
    this.movieDetails = movie;
    console.log(movie);
  }

  pageChanged(event: any) {
    this.selectedParent = -1;
    this.isSelectedParent = false;
    this.config.currentPage = event;
  }
}
