import { StateContext, StateOperator } from '@ngxs/store';
import { mock } from 'jest-mock-extended';
import { AddSourceList } from './source-list.actions';
import { Source, SourceListModel, SourceListState } from './source-list.state';

describe('SourceListState', () => {
  const ctx = mock<StateContext<SourceListModel>>();
  const state = new SourceListState();

  afterEach(() => jest.clearAllMocks());

  it('should add sources to the state', () => {
    const sourceList: Source[] = [
      { title: 'Source 1', link: 'google.com' },
      { title: 'Source 2', link: 'google.com' },
    ];

    state.add(ctx, new AddSourceList(sourceList));
    expect(ctx.setState).toHaveBeenCalled();

    const patcher = ctx.setState.mock.lastCall[0] as StateOperator<SourceListModel>;
    expect(patcher([])).toEqual(sourceList);
  });
});
