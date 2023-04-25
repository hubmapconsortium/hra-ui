import { TestBed } from '@angular/core/testing';

import { TissueFtuService } from './tissue-ftu.service';
import { HttpClientModule } from '@angular/common/http';

describe('TissueFtuService', () => {
  let service: TissueFtuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(TissueFtuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an observable on getReferenceOrgans', () => {
    const res = service.getReferenceOrgans();
    expect(res).toBeDefined();
  });
});
