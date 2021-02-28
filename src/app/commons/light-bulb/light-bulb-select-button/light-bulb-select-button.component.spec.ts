import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightBulbSelectButtonComponent } from './light-bulb-select-button.component';

describe('LightBulbSelectButtonComponent', () => {
  let component: LightBulbSelectButtonComponent;
  let fixture: ComponentFixture<LightBulbSelectButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LightBulbSelectButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LightBulbSelectButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
