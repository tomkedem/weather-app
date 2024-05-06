import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { MyWeatherData } from '../interfaces/MyWeatherData';
import { DailyData } from '../interfaces/DailyData ';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  
  private apiUrl = 'https://nominatim.openstreetmap.org/search';
  private weatherApiUrl = 'http://www.7timer.info/bin/api.pl';
  private API_URL = 'https://api.open-meteo.com/v1/gfs';
 
  
  constructor(private http: HttpClient) {}

  getCurrentCoordinates(city: string): Observable<any> {
    const params = {
      q: city,
      format: 'json'
    };
    return this.http.get(this.apiUrl, { params });
   
  }
 
  getTemperature(lon: number, lat: number): Observable<any> {
    const params = `?lon=${lon}&lat=${lat}&product=civil&output=json`;
    return this.http.get(`${this.weatherApiUrl}${params}`);
  }
  getTemperatureLastWeek(longitude: any, latitude: any, dayCount: number): Observable<any> {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - dayCount);

    const queryParams = {
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      hourly: 'temperature_2m,relativehumidity_2m', // Adjust parameters as needed
      start_date: startDate.toISOString().split('T')[0],
      end_date: new Date().toISOString().split('T')[0],
    };

    return this.http.get<any>(this.API_URL, { params: queryParams })
    .pipe(
      map(response => {
        // Assuming temperature data is in temperature_2m
        const timestamps = response.hourly.time.map((t: any) => new Date(t));
        const temperatures = response.hourly.temperature_2m;

        // Group data by day (assuming timestamps are at hourly intervals)
        const dailyData = timestamps.reduce((acc: any, timestamp: any, index: any) => {
          const day = timestamp.getDate();
          if (!acc[day]) {
            acc[day] = { date: timestamp.toLocaleDateString(), temperatures: [] };
          }
          acc[day].temperatures.push(temperatures[index]);
          return acc;
        }, {});

        // Calculate daily average temperatures
        const MyWeatherData: DailyData[] = Object.values(dailyData).map((day:any) => ({
          ...day,
          averageTemperature: day.temperatures.reduce((sum: number, temp: number) => sum + temp, 0) / day.temperatures.length
        }));

        return MyWeatherData;
      })
    );
  }
  
}
