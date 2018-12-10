import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-restaurant-creator',
  templateUrl: './restaurant-creator.component.html',
  styleUrls: ['./restaurant-creator.component.css']
})
export class RestaurantCreatorComponent implements OnInit {

  restaurantForm = new FormGroup({
    name: new FormControl(''),
    address: new FormControl('')
  })

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.restaurantForm.value);
  }

  readonly ROOT_URL = 'http://localhost:3000/api/restaurants';

  restaurants: any;

  constructor(private http: HttpClient) { }

  getRestaurants() {
    this.restaurants = this.http.get(this.ROOT_URL);
  }

  ngOnInit() {
  }

}
