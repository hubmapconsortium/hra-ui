import { VisualizationPageComponent } from './visualization-page.component';
import { Shallow } from 'shallow-render';

describe('VisualizationPageComponent', () => {
  let shallow: Shallow<VisualizationPageComponent>;

  beforeEach(async () => {
    shallow = new Shallow(VisualizationPageComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
