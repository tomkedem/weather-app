import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-weather-details-modal',
  templateUrl: './weather-details-modal.component.html',
  styleUrls: ['./weather-details-modal.component.css']
})
export class WeatherDetailsModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  closeWindow(): void {
    window.close(); // Close the window
  }
}


