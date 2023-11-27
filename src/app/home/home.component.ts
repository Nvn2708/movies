import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public filterAction: any;

  moviesList(e: any) {
    console.log(e.target.value);
    this.filterAction = e.target.value;
  }
}
