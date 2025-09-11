import { Shallow } from 'shallow-render';

import { SizeLegendComponent, SizeLegend } from './size-legend.component';

describe('SizeLegendComponent', () => {
  let shallow: Shallow<SizeLegendComponent>;

  beforeEach(() => {
    shallow = new Shallow(SizeLegendComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  describe('filteredSizes', () => {
    it('should filter out sizes with labels "25%" and "75%"', async () => {
      const mockSizes: SizeLegend[] = [
        { label: '0%', radius: 5 },
        { label: '25%', radius: 10 },
        { label: '50%', radius: 15 },
        { label: '75%', radius: 20 },
        { label: '100%', radius: 25 },
      ];

      const { instance } = await shallow.render({ bind: { sizes: mockSizes } });

      const filtered = instance.filteredSizes();

      expect(filtered).toHaveLength(3);
      expect(filtered).toEqual([
        { label: '0%', radius: 5 },
        { label: '50%', radius: 15 },
        { label: '100%', radius: 25 },
      ]);
    });
  });
});
