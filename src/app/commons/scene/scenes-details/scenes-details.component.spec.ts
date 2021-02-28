import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenesDetailsComponent } from './scenes-details.component';

describe('ScenesDetailsComponent', () => {
  let component: ScenesDetailsComponent;
  let fixture: ComponentFixture<ScenesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
