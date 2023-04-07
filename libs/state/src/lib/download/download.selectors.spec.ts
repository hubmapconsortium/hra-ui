import { SVG_FORMAT } from './builtin-formats';
import { Svg } from './builtin-formats-ids';
import { DownloadModel } from './download.model';
import { DownloadSelectors } from './download.selectors';

describe('DownloadSelectors', () => {
  const state: DownloadModel = {
    formats: {
      [Svg]: SVG_FORMAT,
    },
    entries: {
      [Svg]: { type: 'url', url: '' },
    },
  };

  it('should return the source list', () => {
    const result = DownloadSelectors.formats(state);
    expect(result).toEqual([SVG_FORMAT]);
  });
});
