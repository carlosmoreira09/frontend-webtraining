import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetsComponent } from './sheets.component';

describe('PlanilhasComponent', () => {
  let component: SheetsComponent;
  let fixture: ComponentFixture<SheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SheetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
