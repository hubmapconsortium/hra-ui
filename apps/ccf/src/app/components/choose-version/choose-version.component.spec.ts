import { ChooseVersion } from './choose-version';
import { ChooseVersionComponent } from './choose-version.component';
import { ChooseVersionModule } from './choose-version.module';
import { Shallow } from 'shallow-render';

describe('ChooseVersionComponent', () => {
  const version: ChooseVersion[] = [
    {
      release: "1",
      version: "1"
    }
  ]
  let shallow: Shallow<ChooseVersionComponent>

  beforeEach(async () => {
    shallow = new Shallow(ChooseVersionComponent, ChooseVersionModule)
  });

  it('should create', () => {
    expect(shallow.render({ bind: { releaseDate: version } })).toBeTruthy();
  });
});
