import { Shallow } from 'shallow-render';

import { GradientLegendComponent, GradientPoint } from './gradient-legend.component';

describe('GradientLegendComponent', () => {
  let shallow: Shallow<GradientLegendComponent>;

  beforeEach(() => {
    shallow = new Shallow(GradientLegendComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  describe('gradientCss', () => {
    const gradient: GradientPoint[] = [
      {
        color: '#ffffff',
        percentage: 100,
      },
    ];

    it('creates a linear css gradient', async () => {
      const { instance } = await shallow.render({ bind: { gradient } });
      expect(instance.gradientCss).toEqual('linear-gradient(270deg, #ffffff 100%)');
    });
  });
});
