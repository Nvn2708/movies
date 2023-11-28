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
  public displyGridMovies: any[] = [];
  protected showFilterData = false;

  config: any;
  isSelectedParent!: boolean;
  selectedParent!: number;

  @Input() set filteredValue(value: any) {
    this.filteredAction = value;
  }

  constructor(private movieService: MoviesServiceService) {}

  ngOnInit() {
    this.movieService.getMoviesData().subscribe((newMovieList: Movie[]) => {
      this.moviesList = newMovieList;
      this.newList = this.moviesList;
      this.oneMovie = newMovieList[0];
    });

    this.moviesList.forEach((movie: any, index: number) => {
      if (movie.info.rank <= 5) {
        this.displyGridMovies.push(movie);
      }
    });

    this.config = {
      itemsPerPage: 18,
      currentPage: 1,
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.newList = this.moviesList;
    const applyFilterValue = changes['filteredValue'].currentValue;
    if (applyFilterValue) {
      this.showFilterData = true;
      this.newList = this.newList.filter((newMovie: Movie) => {
        return (
          newMovie.year.toString().toLowerCase() ===
            applyFilterValue.toString().toLowerCase() ||
          newMovie?.info?.genres?.includes(applyFilterValue) ||
          newMovie.title
            .toLocaleLowerCase()
            .includes(applyFilterValue.toLowerCase())
        );
      });
    }
  }

  onCardClick(movie: any) {
    this.movieDetails = movie;
  }

  pageChanged(event: any) {
    this.selectedParent = -1;
    this.isSelectedParent = false;
    this.config.currentPage = event;
  }
}
