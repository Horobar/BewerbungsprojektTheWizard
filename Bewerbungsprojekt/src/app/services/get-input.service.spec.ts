import { TestBed } from '@angular/core/testing';

import { GetInputService } from './get-input.service';

describe('GetInputService', () => {
  let service: GetInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
