import { Shallow } from 'shallow-render';
import { CsvLoaderOptions, CsvLoaderService, CsvObject } from './csv-loader.service';
import { NgModule, WritableSignal, signal } from '@angular/core';

@NgModule({
  providers: [],
})
class CsvLoaderServiceTestModule {}

describe('CreateVisualizationPageComponent', () => {
  let shallow: Shallow<CsvLoaderService>;

  beforeEach(async () => {
    shallow = new Shallow(CsvLoaderService, CsvLoaderServiceTestModule);
  });

  it('should create', () => {
    expect(() => shallow.createService()).not.toThrow();
  });

  describe('createLoader()', () => {
    it('should return a FileLoader function', () => {
      const { instance } = shallow.createService();
      const loader = instance.createLoader();
      expect(typeof loader).toBe('function');
    });
  });
  describe('load()', () => {
    const testFile: File = new File(['name,age,isStudent\nJohn,25,true\nJane,30,false'], 'test.csv', {
      type: 'text/csv',
    });

    const testOptions: CsvLoaderOptions<{ name: string; age: number; isStudent: boolean }> = {
      transformItem: (item: CsvObject) => ({
        name: item['name'] as string,
        age: Number.parseInt(item['age'] as string),
        isStudent: item['isStudent'] === 'true',
      }),
    };

    it('should load and transform the CSV data', async () => {
      const { instance } = shallow.createService();
      const progress = signal(0);
      const result = await instance.load(testFile, progress, testOptions, { signal: new AbortController().signal });
      expect(result).toEqual([
        { name: 'John', age: 25, isStudent: true },
        { name: 'Jane', age: 30, isStudent: false },
      ]);
    });

    it('should update the progress signal', async () => {
      const { instance } = shallow.createService();
      const progress: WritableSignal<number> = signal(0);
      await instance.load(testFile, progress, testOptions, { signal: new AbortController().signal });

      expect(progress()).toBe(1);
    });

    it('should reject the promise on error', async () => {
      const { instance } = shallow.createService();
      const progress: WritableSignal<number> = signal(0);
      const abortController = new AbortController();
      abortController.abort();

      await expect(instance.load(testFile, progress, testOptions, { signal: abortController.signal })).rejects.toEqual(
        [],
      );
    });
  });
});
