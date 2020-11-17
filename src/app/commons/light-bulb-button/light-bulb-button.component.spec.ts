import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightBulbButtonComponent } from './light-bulb-button.component';

describe('LightBulbButtonComponent', () => {
  let component: LightBulbButtonComponent;
  let fixture: ComponentFixture<LightBulbButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LightBulbButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LightBulbButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
