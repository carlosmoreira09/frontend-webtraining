import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbdomenComponent } from './abdomen.component';

describe('AbdomenComponent', () => {
  let component: AbdomenComponent;
  let fixture: ComponentFixture<AbdomenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbdomenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbdomenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
