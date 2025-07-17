import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCabinsDashboardComponent } from './admin-cabins-dashboard.component';

describe('AdminCabinsDashboardComponent', () => {
  let component: AdminCabinsDashboardComponent;
  let fixture: ComponentFixture<AdminCabinsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCabinsDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCabinsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
