import { TestBed } from '@angular/core/testing';

import { TissueInfoResolverService } from './tissue-info-resolver.service';

describe('TissueInfoResolverService', () => {
  let service: TissueInfoResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TissueInfoResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
