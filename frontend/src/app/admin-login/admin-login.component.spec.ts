import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAdminComponent } from './admin-login.component';

describe('LoginAdminComponent', () => {
  let component: LoginAdminComponent;
  let fixture: ComponentFixture<LoginAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
