import { TestBed } from '@angular/core/testing';

import { MainDataService } from './main-data.service';

describe('MainDataService', () => {
  let service: MainDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
