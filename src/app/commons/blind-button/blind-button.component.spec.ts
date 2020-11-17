import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlindButtonComponent } from './blind-button.component';

describe('BlindButtonComponent', () => {
  let component: BlindButtonComponent;
  let fixture: ComponentFixture<BlindButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlindButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlindButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
