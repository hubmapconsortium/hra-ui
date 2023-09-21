import { TestBed } from '@angular/core/testing';

import { TableDataService } from './tabledata.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('TableDataService', () => {
  let service: TableDataService;
  let http: MockProxy<HttpClient>;

  beforeEach(() => {
    http = mock();
    service = new TableDataService(http);
  });

  describe('getData()', () => {
    beforeEach(() => {
      http.get.mockReturnValue(of(''))
    })

    it('should use http to get the asset csv file', async () => {
      const fileName = 'testFileName';
      const validCols = ['test1', 'test2']
      const result = service.getData(fileName, validCols);
      result.subscribe();
      expect(http.get).toHaveBeenCalledWith(`assets/table-data/${fileName}`, {
        responseType: 'text'
      });
    });
  });

  describe('filterColumns()', () => {
    it('should filter out invalid columns and return only valid columns', () => {
      const columns = ['test1', 'test2', 'test3', 'test4'];
      const validCols = ['test1', 'test2', 'test5'];

      const result = service['filterColumns'](columns, validCols); // Accessing the private method

      expect(result).toEqual(['test1', 'test2']);
    });
  })
});
