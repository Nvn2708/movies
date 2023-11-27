import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MoviesServiceService } from '../movies-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public newList: any;
  public genersList: any;
  public yearsList: any;

  @Output() moviesList = new EventEmitter<any>();

  constructor(private movieService: MoviesServiceService) {}

  ngOnInit() {
    this.movieService.getMoviesData().subscribe((newMovieList) => {
      this.newList = newMovieList;
    });
    this.getGenerList();
  }

  getGenerList() {
    let newGener: any = [];
    let yearList: any = [];
    this.newList.forEach((element: any) => {
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
}
