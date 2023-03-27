import { TestBed } from '@angular/core/testing';

import { TissueLibraryService } from './tissue-library.service';

describe('TissueLibraryService', () => {
  let service: TissueLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TissueLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
