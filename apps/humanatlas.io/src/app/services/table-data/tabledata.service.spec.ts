import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MockProxy, mock } from 'jest-mock-extended';
import { of } from 'rxjs';
import { TableDataService } from './tabledata.service';

describe('TableDataService', () => {
  let service: TableDataService;
  let http: MockProxy<HttpClient>;

  beforeEach(() => {
    http = mock();
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: http }],
    });

    service = TestBed.inject(TableDataService);
  });

  describe('getData()', () => {
    beforeEach(() => {
      http.get.mockReturnValue(of('a b c'));
    });

    it('should use http to get the asset csv file', async () => {
      const fileName = 'testFileName';
      const validCols = ['test1', 'test2'];
      const result = service.getData(fileName, validCols);
      result.subscribe();
      expect(http.get).toHaveBeenCalledWith(`assets/table-data/${fileName}`, {
        responseType: 'text',
      });
    });
  });
});
