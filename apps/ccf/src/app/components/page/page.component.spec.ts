import { PageComponent } from './page.component';
import { PageModule } from './page.module';
import { Shallow } from 'shallow-render';

describe('PageComponent', () => {
  let shallow: Shallow<PageComponent>;

  beforeEach(async () => {
    shallow = new Shallow(PageComponent, PageModule)
  });

  it('should create', async() => {
    await expect(shallow.render()).resolves.toBeTruthy();
  });
});
