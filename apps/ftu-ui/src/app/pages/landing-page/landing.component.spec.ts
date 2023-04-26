import { Shallow } from 'shallow-render';
import { LandingComponent } from './landing.component';

describe('AppComponent', () => {
  let shallow: Shallow<LandingComponent>;

  beforeEach(() => {
    shallow = new Shallow(LandingComponent);
  });

  it('should create component', async () => {
    expect(shallow.render()).resolves.toBeDefined();
  });
});
