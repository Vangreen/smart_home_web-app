import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightBulbButtonMockComponent } from './light-bulb-button-mock.component';

describe('LightBulbMockComponent', () => {
  let component: LightBulbButtonMockComponent;
  let fixture: ComponentFixture<LightBulbButtonMockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LightBulbButtonMockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LightBulbButtonMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
