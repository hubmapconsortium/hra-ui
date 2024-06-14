import { render } from '@testing-library/angular';

import { ColorPickerLabelComponent } from './color-picker-label.component';

describe('ColorPickerLabelComponent', () => {
  it('should update color when selectColor is called', async () => {
    const {
      fixture: { componentInstance: instance },
    } = await render(ColorPickerLabelComponent, {
      componentInputs: {
        color: [0, 0, 0],
        label: 'Test Label',
      },
    });

    instance.selectColor('#ffffff');
    expect(instance.color()).toEqual([255, 255, 255]);
  });

  it('should not update color if same color picked', async () => {
    const {
      fixture: { componentInstance: instance },
    } = await render(ColorPickerLabelComponent, {
      componentInputs: {
        color: [255, 255, 255],
        label: 'Test Label',
      },
    });

    instance.selectColor('#ffffff');
    expect(instance.color()).toEqual([255, 255, 255]);
  });
});
