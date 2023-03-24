import { DownloadModel, FileFormat } from './download.model';
import { DownloadSelectors } from './download.selectors';

describe('DownloadSelectors', () => {
  const state: DownloadModel = [{ format: FileFormat.PNG, label: 'PNG' }];
  it('should return the source list', () => {
    const result = DownloadSelectors.getFormats(state);
    expect(result).toEqual(state);
  });
});
