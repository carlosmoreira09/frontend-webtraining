import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtletasComponent } from './athlete.component';

describe('AtletasComponent', () => {
  let component: AtletasComponent;
  let fixture: ComponentFixture<AtletasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtletasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtletasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
