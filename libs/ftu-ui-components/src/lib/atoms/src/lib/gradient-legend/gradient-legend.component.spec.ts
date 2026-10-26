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
      expect(instance.gradientCss).toEqual('linear-gradient(90deg, #ffffff 100%)');
    });
  });

  describe('labels', () => {
    it('defaults to 0.0 and 1.0 without an expression range', async () => {
      const { instance } = await shallow.render();
      expect(instance.startLabel).toEqual('0.0');
      expect(instance.endLabel).toEqual('1.0');
    });

    it('shows the min and max expression with 3 decimal places', async () => {
      const { instance } = await shallow.render({ bind: { minExpression: 0.012345, maxExpression: 2.5 } });
      expect(instance.startLabel).toEqual('0.012');
      expect(instance.endLabel).toEqual('2.500');
    });
  });
});
