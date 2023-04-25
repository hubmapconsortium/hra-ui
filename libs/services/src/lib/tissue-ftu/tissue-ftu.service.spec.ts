import { TestBed } from '@angular/core/testing';

import { TissueFtuService } from './tissue-ftu.service';

describe('TissueFtuService', () => {
  let service: TissueFtuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TissueFtuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
