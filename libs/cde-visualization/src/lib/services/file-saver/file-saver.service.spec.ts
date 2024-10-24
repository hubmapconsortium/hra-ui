import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { SnackbarService } from '@hra-ui/design-system/snackbar';
import { FileSaverService } from './file-saver.service';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('FileSaverService', () => {
  describe('save(url, filename)', () => {
    it('downloads a file from a URL', () => {
      TestBed.configureTestingModule({
        providers: [provideNoopAnimations()],
      });

      const document = TestBed.inject(DOCUMENT);
      const snackbar = TestBed.inject(SnackbarService);
      const fileSaver = TestBed.inject(FileSaverService);

      jest.spyOn(document, 'createElement');
      jest.spyOn(document.body, 'appendChild');
      jest.spyOn(document.body, 'removeChild');

      const snackbarOpenSpy = jest.spyOn(snackbar, 'open');

      fileSaver.save('http://example.com', 'test.csv');

      const el = jest.mocked(document.createElement).mock.results[0].value as HTMLAnchorElement;

      expect(el.getAttribute('href')).toEqual('http://example.com');
      expect(el.getAttribute('target')).toEqual('_blank');
      expect(el.getAttribute('download')).toEqual('test.csv');
      expect(document.body.appendChild).toHaveBeenCalledWith(expect.any(HTMLAnchorElement));
      expect(snackbarOpenSpy).toHaveBeenCalledWith('File downloaded', '', false, 'end', { duration: 5000 });
    });
  });

  describe('saveData(data, filename)', () => {
    const data = new Blob(['abc', 'def']);
    const filename = 'test.txt';
    const url = 'data:an-object-url';

    beforeEach(() => {
      Object.defineProperties(URL, {
        createObjectURL: {
          value: jest.fn().mockReturnValue(url),
        },
        revokeObjectURL: {
          value: jest.fn(),
        },
      });
    });

    it('turns the data into an object URL', () => {
      const service = TestBed.inject(FileSaverService);
      const spy = jest.spyOn(service, 'save').mockReturnValue();

      service.saveData(data, filename);
      expect(URL.createObjectURL).toHaveBeenCalledWith(data);
      expect(spy).toHaveBeenCalledWith(url, filename);
      expect(URL.revokeObjectURL).toHaveBeenCalledWith(url);
    });
  });

  describe('saveCsv(data, filename)', () => {
    const data = [
      { a: 1, b: 2 },
      { a: 2, b: 3 },
    ];
    const filename = 'test.txt';
    const serializedData = new Blob(['a,b\n', '1,2\n', '2,3']);

    it('turns the data into an object URL', () => {
      const service = TestBed.inject(FileSaverService);
      const spy = jest.spyOn(service, 'saveData').mockReturnValue();

      service.saveCsv(data, filename);
      expect(spy).toHaveBeenCalledWith(serializedData, filename);
    });
  });
});
