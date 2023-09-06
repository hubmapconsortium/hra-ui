import { BottomToolbarComponent } from './bottom-toolbar.component';
import { BottomToolbarModule } from './bottom-toolbar.module';
import { Shallow } from 'shallow-render';

describe('BottomToolbarComponent', () => {
  let shallow: Shallow<BottomToolbarComponent>

  beforeEach(async () => {
    shallow = new Shallow(BottomToolbarComponent, BottomToolbarModule)
  });

  it('should create', () => {
    expect(shallow.render()).toBeTruthy();
  });
});
