import { TestBed } from '@angular/core/testing';

import { ConcatService } from './concat.service';

describe('ConcatService', () => {
  let service: ConcatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConcatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
