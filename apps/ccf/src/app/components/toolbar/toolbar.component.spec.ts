import { NavItems } from './nav-items';
import { ToolbarComponent } from './toolbar.component';
import { ToolbarModule } from './toolbar.module';
import { Shallow } from 'shallow-render';

describe('ToolbarComponent', () => {
  let shallow: Shallow<ToolbarComponent>;

  beforeEach(async () => {
    shallow = new Shallow(ToolbarComponent, ToolbarModule);
  });

  it('should be', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
