import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewSheetComponent } from './preview-sheet.component';

describe('ModalSheetComponent', () => {
  let component: PreviewSheetComponent;
  let fixture: ComponentFixture<PreviewSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
