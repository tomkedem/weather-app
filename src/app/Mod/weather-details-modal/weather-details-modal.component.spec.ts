import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherDetailsModalComponent } from './weather-details-modal.component';

describe('WeatherDetailsModalComponent', () => {
  let component: WeatherDetailsModalComponent;
  let fixture: ComponentFixture<WeatherDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherDetailsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
