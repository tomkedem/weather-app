import { Component, Input, OnInit,OnChanges, SimpleChanges } from '@angular/core';
import {  } from '@angular/core';
import { IWeatherData } from '../../interfaces/IWeatherData';
import { WeatherService } from '../../Services/weather.service';
import { MatDialog } from '@angular/material/dialog';
import { WeatherDetailsModalComponent } from '../weather-details-modal/weather-details-modal.component';



@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
  styleUrls: ['./weather-table.component.css']
})
export class WeatherTableComponent implements OnInit {
  @Input() citiesOrg!: string; // Receive cities as input
  @Input() key!: number; // Receive cities as input
 cities: string[];
 lon: any;
 lat: any;
 isShowLastWeek: any = null;
 temperature: any | null = null;
  weatherData: IWeatherData[] = [];
  curWeatherData: IWeatherData | undefined;

  constructor(private weatherService: WeatherService,public dialog: MatDialog) {
    this.cities = [];
  }

  ngOnInit() {
    this.getWeatherData();
    this.processCityInput();   
 
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['key']) {      
      this.processCityInput();     
    }
  }
// Function to handle city input and split if necessary
processCityInput(): void {
  // Check if citiesOrg is not empty and then process
  if (this.citiesOrg) {
    // Trim the input to remove leading/trailing whitespace
    const trimmedInput = this.citiesOrg.trim();

    // Check if the input contains commas
    if (trimmedInput.includes(',')) {
      // If there are commas, assume it's a list of cities, split and trim each
      this.cities = trimmedInput.split(',').map(item => item.trim());
    } else {
      // If no commas, it's a single city, put it into the array as the only element
      this.cities = [trimmedInput]; // Ensure it's still an array for consistency
    }
  } else {
    console.log('No city information provided');
    this.cities = []; // or set to a default value or handle the error
  }
}
  getWeatherData() {
    this.weatherData = [];
    this.cities.forEach(city => {
      this.weatherService.getCurrentCoordinates(city).subscribe({
        next: (data) => {
         
          this.lon = data[0].lon;
          this.lat = data[0].lat;
         
          this.weatherService.getTemperature(this.lon, this.lat).subscribe(data => {
            if (data.dataseries && data.dataseries.length > 0) {
              this.temperature = data.dataseries[0].temp2m;
            } else {
              this.temperature = null;
            }
           
            this.weatherData.push({ city: city, temperature: this.temperature ,lon: this.lon, lat: this.lat});
          });
          // this.weatherData.push({ city: city, temperature: data.temperature });
        },
        error: (err) => {
          console.error(`Error fetching weather for ${city}: ${err}`);
          //this.weatherData.push({ city: city, temperature: 'Error fetching data' });
        }
      });
    });
  }
  toggleShowLastWeek(data: any): void {
    if (this.isShowLastWeek === data) {
      this.isShowLastWeek = null; // סגירת השורה אם היא כבר פתוחה
    } else {
      this.isShowLastWeek = data; // פתיחת השורה עם הנתונים של השבוע האחרון
    }
  }
  

  loadLastMonthData(lon: any,lat:any): void {
    
    this.dialog.open(WeatherDetailsModalComponent, {
      width: '250px',
      data: { lon: lon, lat: lat , arg: 0}
      
    });
  }
}
