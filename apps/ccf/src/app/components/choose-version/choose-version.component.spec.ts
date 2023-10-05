import { ChooseVersionComponent } from './choose-version.component';
import { ChooseVersionModule } from './choose-version.module';
import { Shallow } from 'shallow-render';

describe('ChooseVersionComponent', () => {
  let shallow: Shallow<ChooseVersionComponent>;

  beforeEach(async () => {
    shallow = new Shallow(ChooseVersionComponent, ChooseVersionModule);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
