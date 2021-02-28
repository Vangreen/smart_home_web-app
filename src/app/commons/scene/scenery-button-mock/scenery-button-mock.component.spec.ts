import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneryButtonMockComponent } from './scenery-button-mock.component';

describe('SceneryButtonMockComponent', () => {
  let component: SceneryButtonMockComponent;
  let fixture: ComponentFixture<SceneryButtonMockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SceneryButtonMockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneryButtonMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
