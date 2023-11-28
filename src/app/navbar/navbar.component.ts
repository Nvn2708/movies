import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MoviesServiceService } from '../movies-service.service';
import { Movie } from '../movies.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public newList!: Movie[];
  public genersList: any;
  public yearsList: any;
  public searchTerm: any;

  @Output() moviesList = new EventEmitter<any>();

  constructor(private movieService: MoviesServiceService) { }

  ngOnInit() {
    this.movieService.getMoviesData().subscribe((newMovieList: Movie[]) => {
      this.newList = newMovieList;
    });
    this.getGenerList();
  }

  getGenerList() {
    let newGener: any = [];
    let yearList: any = [];

    this.newList.forEach((element: Movie) => {
      let data = element.info.genres;
      yearList.push(element.year);

      data?.forEach((newList: any) => {
        newGener.push(newList);
      });
    });

    this.genersList = [...new Set(newGener)];
    this.yearsList = [...new Set(yearList)];
  }

  onChange(event: any) {
    console.log(event.target.value)
    this.moviesList.emit(event.target.value);
  }

  searchFeature() {
     this.moviesList.emit(this.searchTerm);
  }

  sendSearchTerm(){
    this.moviesList.emit(this.searchTerm);
  }

}
