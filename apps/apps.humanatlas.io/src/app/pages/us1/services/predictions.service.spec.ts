import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
// import { PredictionsService } from './predictions.service';

describe('PredictionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
  });

  it('TODO', async () => {
    // const service = TestBed.inject(PredictionsService);
    //
  });
});
