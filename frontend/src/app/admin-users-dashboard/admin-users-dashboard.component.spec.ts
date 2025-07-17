import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersDashboardComponent } from './admin-users-dashboard.component';

describe('AdminUsersDashboardComponent', () => {
  let component: AdminUsersDashboardComponent;
  let fixture: ComponentFixture<AdminUsersDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUsersDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUsersDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
