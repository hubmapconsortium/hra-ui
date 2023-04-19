import { Shallow } from 'shallow-render';
import { FtuComponent } from './ftu.component';

describe('AppComponent', () => {
  let shallow: Shallow<FtuComponent>;

  beforeEach(() => {
    shallow = new Shallow(FtuComponent);
  });

  it('should create component', async () => {
    expect(shallow.render()).resolves.toBeDefined();
  });
});
