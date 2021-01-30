import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenesButtonComponent } from './scenes-button.component';

describe('ScenesButtonComponent', () => {
  let component: ScenesButtonComponent;
  let fixture: ComponentFixture<ScenesButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenesButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenesButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
