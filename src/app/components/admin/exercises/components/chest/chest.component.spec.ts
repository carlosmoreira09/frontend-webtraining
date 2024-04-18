import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChestComponent } from './chest.component';

describe('CostasComponent', () => {
  let component: ChestComponent;
  let fixture: ComponentFixture<ChestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
