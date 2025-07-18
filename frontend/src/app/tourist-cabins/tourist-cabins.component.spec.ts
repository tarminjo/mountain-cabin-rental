import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristCabinsComponent } from './tourist-cabins.component';

describe('TouristCabinsComponent', () => {
  let component: TouristCabinsComponent;
  let fixture: ComponentFixture<TouristCabinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristCabinsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristCabinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
