import { Shallow } from 'shallow-render';
import { SimpleTileComponent } from './simple-tile.component';
import { SimpleTileModule } from './simple-tile.module';

describe('SimpleTileComponent', () => {
  let shallow: Shallow<SimpleTileComponent>;

  beforeEach(async () => {
    shallow = new Shallow(SimpleTileComponent, SimpleTileModule);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
