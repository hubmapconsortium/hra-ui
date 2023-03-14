import { SourceListModel } from './source-list.model';
import { SourceListSelectors } from './source-list.selectors';

describe('SourceListSelectors', () => {
  const state: SourceListModel = [
    { title: 'Owner Title 1', link: 'google.com' },
    { title: 'Owner Title 2', link: 'google.com' },
  ];
  it('should return the source list', () => {
    const result = SourceListSelectors.getSourceList(state);
    expect(result).toEqual(state);
  });
});
