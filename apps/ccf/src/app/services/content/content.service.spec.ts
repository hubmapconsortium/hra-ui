import { ContentService } from './content.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { MockProxy, mock } from 'jest-mock-extended';

describe('ContentService', () => {
  let http: MockProxy<HttpClient>;
  let service: ContentService;

  beforeEach(() => {
    http = mock();
    service = new ContentService(http);
  });

  describe('getContent(file)', () => {
    beforeEach(() => {
      http.get.mockReturnValue(of(''));
    });

    it('should use http to get the asset file', async () => {
      const fileName = 'test';
      const res = service.getContent(fileName);
      res.subscribe();
      expect(http.get).toHaveBeenCalledWith(
        `assets/content/pages/${fileName}.yaml`,
        {
          observe: 'body',
          responseType: 'text',
        }
      );
    });
  });
});
