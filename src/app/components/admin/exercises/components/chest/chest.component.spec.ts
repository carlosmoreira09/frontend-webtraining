import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostasComponent } from './costas.component';

describe('CostasComponent', () => {
  let component: CostasComponent;
  let fixture: ComponentFixture<CostasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CostasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
