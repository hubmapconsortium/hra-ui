import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MockProxy, mock } from 'jest-mock-extended';
import { of } from 'rxjs';
import { ContentService } from './content.service';

describe('ContentService', () => {
  let http: MockProxy<HttpClient>;
  let service: ContentService;

  beforeEach(() => {
    http = mock();
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: http }],
    });

    service = TestBed.inject(ContentService);
  });

  describe('getContent(file)', () => {
    beforeEach(() => {
      http.get.mockReturnValue(of(''));
    });

    it('should use http to get the asset file', async () => {
      const fileName = 'test';
      const res = service.getContent(fileName);
      res.subscribe();
      expect(http.get).toHaveBeenCalledWith(`assets/content/pages/${fileName}.yaml`, {
        observe: 'body',
        responseType: 'text',
      });
    });
  });
});
