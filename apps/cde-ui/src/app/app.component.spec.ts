import { AppComponent } from './app.component';
import { Shallow } from 'shallow-render';

describe('AppComponent', () => {
  let shallow: Shallow<AppComponent>;
  beforeEach(async () => {
    shallow = new Shallow(AppComponent);
  });

  it(`should have as title 'cde-ui'`, async () => {
    await expect(shallow.render()).resolves.toBeTruthy();
  });
});
