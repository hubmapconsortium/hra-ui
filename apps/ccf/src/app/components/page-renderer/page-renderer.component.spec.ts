import { Shallow } from 'shallow-render';
import { PageRendererComponent } from './page-renderer.component';
import { PageRendererModule } from './page-renderer.module';

describe('PageRendererComponent', () => {
  let shallow: Shallow<PageRendererComponent>;

  beforeEach(async () => {
    shallow = new Shallow(PageRendererComponent, PageRendererModule);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
