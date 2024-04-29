import { MetadataComponent } from './metadata.component';
import { Shallow } from 'shallow-render';

describe('MetadataComponent', () => {
  let shallow: Shallow<MetadataComponent>;

  beforeEach(async () => {
    shallow = new Shallow(MetadataComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
