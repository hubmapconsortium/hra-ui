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
    it('defaults to 0.000 and 1.000 without an expression range', async () => {
      const { find } = await shallow.render();
      expect(find('.start').nativeElement.textContent.trim()).toEqual('0.000');
      expect(find('.end').nativeElement.textContent.trim()).toEqual('1.000');
    });

    it('shows the min and max expression with 3 decimal places', async () => {
      const { find } = await shallow.render({ bind: { minExpression: 0.012345, maxExpression: 2.5 } });
      expect(find('.start').nativeElement.textContent.trim()).toEqual('0.012');
      expect(find('.end').nativeElement.textContent.trim()).toEqual('2.500');
    });
  });
});
