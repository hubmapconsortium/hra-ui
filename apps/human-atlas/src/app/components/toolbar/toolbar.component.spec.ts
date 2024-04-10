import { Shallow } from 'shallow-render';
import { ToolbarComponent } from './toolbar.component';
import { ToolbarModule } from './toolbar.module';

describe('ToolbarComponent', () => {
  let shallow: Shallow<ToolbarComponent>;

  beforeEach(async () => {
    shallow = new Shallow(ToolbarComponent, ToolbarModule);
  });

  it('should be', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
