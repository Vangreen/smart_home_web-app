import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPickerSceneriesComponent } from './color-picker-sceneries.component';

describe('ColorPickerSceneriesComponent', () => {
  let component: ColorPickerSceneriesComponent;
  let fixture: ComponentFixture<ColorPickerSceneriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorPickerSceneriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPickerSceneriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
