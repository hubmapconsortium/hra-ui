import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { MockTissueFtuService } from './tissue-ftu.mock';

describe('MockTIssueFtuService', () => {
  let service: MockTissueFtuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(MockTissueFtuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an observable on getReferenceOrgans', () => {
    const res = service.getReferenceOrgans();
    expect(res).toBeDefined();
  });

  describe('getCellSummaries(...)', () => {
    it('should return an observable of mock data', async () => {
      const result = await firstValueFrom(service.getCellSummaries());
      expect(result).toBeDefined();
    });
  });
});
