import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSelectorDialogComponent } from './device-selector-dialog.component';

describe('DeviceSelectorDialogComponent', () => {
  let component: DeviceSelectorDialogComponent;
  let fixture: ComponentFixture<DeviceSelectorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceSelectorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSelectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
