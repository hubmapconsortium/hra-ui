import { SlugifyPipe } from './slugify.pipe';

describe('SlugifyPipe', () => {
  it('should slugify strings', () => {
    const pipe = new SlugifyPipe();

    expect(pipe.transform('')).toEqual('');

    const value = pipe.transform('  Abc d!e@F   ghi ');
    expect(value).toEqual('abc-def-ghi');
  });
});
