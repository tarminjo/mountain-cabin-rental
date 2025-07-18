import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristRentalsComponent } from './tourist-rentals.component';

describe('TouristRentalsComponent', () => {
  let component: TouristRentalsComponent;
  let fixture: ComponentFixture<TouristRentalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristRentalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristRentalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
