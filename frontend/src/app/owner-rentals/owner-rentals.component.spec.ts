import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerRentalsComponent } from './owner-rentals.component';

describe('OwnerRentalsComponent', () => {
  let component: OwnerRentalsComponent;
  let fixture: ComponentFixture<OwnerRentalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerRentalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerRentalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
