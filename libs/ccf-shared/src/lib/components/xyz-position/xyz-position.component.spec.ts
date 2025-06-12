import { Shallow } from 'shallow-render';

import { XYZPositionComponent } from './xyz-position.component';
import { XYZPositionModule } from './xyz-position.module';

describe('XYZPositionComponent', () => {
  let shallow: Shallow<XYZPositionComponent>;

  beforeEach(() => {
    shallow = new Shallow(XYZPositionComponent, XYZPositionModule);
  });

  it('creates', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
