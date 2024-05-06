import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildWeatherTableComponent } from './child-weather-table.component';

describe('ChildWeatherTableComponent', () => {
  let component: ChildWeatherTableComponent;
  let fixture: ComponentFixture<ChildWeatherTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildWeatherTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildWeatherTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
