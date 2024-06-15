import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalExercisesComponent} from './modal-exercises.component';

describe('ModalExercisesComponent', () => {
  let component: ModalExercisesComponent;
  let fixture: ComponentFixture<ModalExercisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalExercisesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModalExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
