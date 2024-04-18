import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackLegComponent } from './back-leg.component';

describe('BackLegComponent', () => {
  let component: BackLegComponent;
  let fixture: ComponentFixture<BackLegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackLegComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackLegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
