import { render } from '@testing-library/angular';

import { ColorPickerLabelComponent } from './color-picker-label.component';

/** Creates a hover event on a label with the given content and visible widths */
function hoverEvent(scrollWidth: number, clientWidth: number): MouseEvent {
  return { currentTarget: { scrollWidth, clientWidth } } as unknown as MouseEvent;
}

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

  it('should open the tooltip when the hovered label is truncated', async () => {
    const { fixture } = await render(ColorPickerLabelComponent, {
      componentInputs: {
        color: [255, 255, 255],
        label: 'Mega Looooooooooooooooooooooooooooooooooooooooooooong Test Label',
      },
    });

    fixture.componentInstance.handleHover(hoverEvent(240, 76));
    expect(fixture.componentInstance.tooltipOpen).toBe(true);
  });

  it('should not open the tooltip when the hovered label fits', async () => {
    const { fixture } = await render(ColorPickerLabelComponent, {
      componentInputs: {
        color: [255, 255, 255],
        label: 'B cells',
      },
    });

    fixture.componentInstance.handleHover(hoverEvent(48, 76));
    expect(fixture.componentInstance.tooltipOpen).toBe(false);
  });
});
