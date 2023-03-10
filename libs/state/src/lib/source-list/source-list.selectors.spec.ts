import { TestBed } from '@angular/core/testing';
import { Store, NgxsModule } from '@ngxs/store';
import { AddSourceList } from './source-list.actions';
import { SourceListModel, SourceListState } from './source-list.state';

describe('SourceListState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([SourceListState])],
    });

    store = TestBed.inject(Store);
  });

  it('should select the data sources from the state', () => {
    const source1 = { title: 'Owner Title', link: 'google.com' };
    const source2 = { title: 'Owner Title 2', link: 'google.com' };
    store.dispatch(new AddSourceList([source1]));
    store.dispatch(new AddSourceList([source2]));
    const dataSources = store.selectSnapshot<SourceListModel>((state) => state.app.sourceList);
    expect(dataSources).toEqual(2);
    expect(dataSources[0]).toEqual(source1);
    expect(dataSources[1]).toEqual(source2);
  });
});
