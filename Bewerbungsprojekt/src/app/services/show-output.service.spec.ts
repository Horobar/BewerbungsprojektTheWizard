import { TestBed } from '@angular/core/testing';

import { ShowOutputService } from './show-output.service';

describe('ShowOutputService', () => {
  let service: ShowOutputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowOutputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
