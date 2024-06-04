import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorAuthorizeComponent } from './user-register.component';

describe('RegisterComponent', () => {
  let component: ErrorAuthorizeComponent;
  let fixture: ComponentFixture<ErrorAuthorizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorAuthorizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorAuthorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
