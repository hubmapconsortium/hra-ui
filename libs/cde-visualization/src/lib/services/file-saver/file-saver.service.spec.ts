import { TestBed } from '@angular/core/testing';
import { FileSaverService } from './file-saver.service';

describe('FileSaverService', () => {
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
