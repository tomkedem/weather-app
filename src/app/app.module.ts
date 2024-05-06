import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CityInputComponent } from './Mod/city-input/city-input.component';
import { WeatherTableComponent } from './Mod/weather-table/weather-table.component';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChildWeatherTableComponent } from './Mod/child-weather-table/child-weather-table.component';
import { WeatherDetailsModalComponent } from './Mod/weather-details-modal/weather-details-modal.component';
import { RoundDownPipe } from './pipe/round-down.pipe';
import { GlobalErrorHandler } from './shared/global-error-handler.service';



@NgModule({
  declarations: [
    AppComponent,
    CityInputComponent,
    WeatherTableComponent,
    ChildWeatherTableComponent,
    WeatherDetailsModalComponent,
    RoundDownPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,   
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    GlobalErrorHandler
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
