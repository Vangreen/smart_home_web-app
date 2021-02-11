import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedOptionRoomDialogComponent } from './advanced-option-room-dialog.component';

describe('AdvancedOptionRoomDialogComponent', () => {
  let component: AdvancedOptionRoomDialogComponent;
  let fixture: ComponentFixture<AdvancedOptionRoomDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancedOptionRoomDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedOptionRoomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
