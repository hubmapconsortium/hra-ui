import { Shallow } from 'shallow-render';
import { SourceListComponent } from './source-list.component';

describe('SourceListComponent', () => {
  let shallow: Shallow<SourceListComponent>;
  beforeEach(() => {
    shallow = new Shallow(SourceListComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
