import { VisualizationHeaderComponent } from './visualization-header.component';
import { Shallow } from 'shallow-render';

describe('VisualizationHeaderComponent', () => {
  let shallow: Shallow<VisualizationHeaderComponent>;

  beforeEach(async () => {
    shallow = new Shallow(VisualizationHeaderComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
