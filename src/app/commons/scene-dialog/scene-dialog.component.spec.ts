import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneDialogComponent } from './scene-dialog.component';

describe('SceneDialogComponent', () => {
  let component: SceneDialogComponent;
  let fixture: ComponentFixture<SceneDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SceneDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
