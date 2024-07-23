import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserSheetComponent} from './user-sheet.component';

describe('ModalSheetComponent', () => {
  let component: UserSheetComponent;
  let fixture: ComponentFixture<UserSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSheetComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
