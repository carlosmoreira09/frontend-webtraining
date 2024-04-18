import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrengthenComponent } from './strengthen.component';

describe('StrengthenComponent', () => {
  let component: StrengthenComponent;
  let fixture: ComponentFixture<StrengthenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrengthenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StrengthenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
