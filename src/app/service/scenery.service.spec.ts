import { TestBed } from '@angular/core/testing';

import { SceneryService } from './scenery.service';

describe('SceneryService', () => {
  let service: SceneryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SceneryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
