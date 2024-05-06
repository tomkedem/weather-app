import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../../Services/weather.service';


interface WeatherData {
  date: string;
  averageTemperature: number;
}


@Component({
  selector: 'app-child-weather-table',
  templateUrl: './child-weather-table.component.html',
  styleUrls: ['./child-weather-table.component.css']
})
export class ChildWeatherTableComponent implements OnInit {

  @Input() latitude!: number | null;
  @Input() longitude!: number | null;
  @Input() arg!: number | null;

  
  weatherData: WeatherData[] = [];

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    if (this.latitude && this.longitude) {
      console.log("Hi from Child arg:==>", this.arg);
      if (this.arg === 1) {
        this.getWeatherData();
      }else{
        this.getWeatherDataMonth();
      }     
    }
  }
  isScrollable(): boolean {
    const windowHeight = window.innerHeight;
    const containerHeight = document.querySelector('.weather-table-container')?.clientHeight || 0;
    return containerHeight > 0 && containerHeight > windowHeight * 0.75;
  }

  
  getWeatherData() {
    this.weatherService.getTemperatureLastWeek(this.longitude,this.latitude).subscribe((data) => {
      this.weatherData = data.map((item:any) => ({
        date: item.date,
        averageTemperature: item.averageTemperature
      }));
      console.log("Hi getTemperatureLastWeek tom from Child:==>", data);
  
    });
   
  }
  getWeatherDataMonth() {
    this.weatherService.getTemperatureLastMonth(this.longitude,this.latitude).subscribe((data) => {
      this.weatherData = data.map((item:any) => ({
        date: item.date,
        averageTemperature: item.averageTemperature
      }));
      console.log("Hi getTemperatureLastWeek tom from Child:==>", data);
  
    });
   
  }

}
