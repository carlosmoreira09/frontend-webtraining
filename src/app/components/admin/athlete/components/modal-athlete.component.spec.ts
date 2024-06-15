import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalAtletaComponent} from './modal-athlete.component';

describe('ModalAtletaComponent', () => {
  let component: ModalAtletaComponent;
  let fixture: ComponentFixture<ModalAtletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAtletaComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModalAtletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
