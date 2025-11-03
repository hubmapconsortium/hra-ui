import { cssUrl, CssUrlPipe } from './css';

describe('cssUrl(value)', () => {
  it('turns regular urls into css urls', () => {
    const url = 'https://example.com';
    const expected = `url("${url}")`;

    expect(cssUrl(url)()).toEqual(expected);
    expect(cssUrl(() => url)()).toEqual(expected);
  });
});

describe('CssUrlPipe', () => {
  it('turns regular urls into css urls', () => {
    const url = 'https://example.com';
    const expected = `url("${url}")`;
    const pipe = new CssUrlPipe();

    expect(pipe.transform(url)).toEqual(expected);
  });
});
