import { Component } from '@angular/core';
import { WeatherService } from '../../Services/weather.service';


@Component({
  selector: 'app-city-input',
  templateUrl: './city-input.component.html',
  styleUrls: ['./city-input.component.css']
})
export class CityInputComponent {
  cities: string = '';
  key: number = 0;

  isCitiesCall: boolean = false;
  constructor(private weatherService: WeatherService) {}

  onSubmit(): void {
    if (!this.cities) {
      this.isCitiesCall = false;
      console.log('Please enter a city');
      return;
    }
    this.key++;
    this.isCitiesCall = true;
    
    // Code to handle the submission and perhaps call the WeatherTableComponent
  }
}
