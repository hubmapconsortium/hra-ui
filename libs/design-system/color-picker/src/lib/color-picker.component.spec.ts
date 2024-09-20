import { render } from '@testing-library/angular';
import { ColorPickerComponent } from './color-picker.component';

describe('ColorPickerComponent', () => {
  it('should update color when selectColor is called', async () => {
    const {
      fixture: { componentInstance: instance },
    } = await render(ColorPickerComponent, {
      componentInputs: {
        color: [0, 0, 0],
      },
    });

    instance.selectColor('#ffffff');
    expect(instance.color()).toEqual([255, 255, 255]);
  });

  it('should not update color if same color picked', async () => {
    const {
      fixture: { componentInstance: instance },
    } = await render(ColorPickerComponent, {
      componentInputs: {
        color: [255, 255, 255],
      },
    });

    instance.selectColor('#ffffff');
    expect(instance.color()).toEqual([255, 255, 255]);
  });
});
