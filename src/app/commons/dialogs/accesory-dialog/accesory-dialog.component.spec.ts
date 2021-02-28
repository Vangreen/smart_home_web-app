import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesoryDialogComponent } from './accesory-dialog.component';

describe('AccesoryDialogComponent', () => {
  let component: AccesoryDialogComponent;
  let fixture: ComponentFixture<AccesoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccesoryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
