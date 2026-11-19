import { fireEvent, render, screen } from '@testing-library/angular';

import { ColorPickerLabelComponent } from './color-picker-label.component';

/** Creates a hover event on a label with the given content and visible widths */
function hoverEvent(scrollWidth: number, clientWidth: number): MouseEvent {
  return { currentTarget: { scrollWidth, clientWidth } } as unknown as MouseEvent;
}

describe('ColorPickerLabelComponent', () => {
  it('opens a color picker named after the label from its swatch button', async () => {
    await render(ColorPickerLabelComponent, {
      componentInputs: {
        color: [0, 0, 0],
        label: 'B cells',
      },
    });

    const swatch = screen.getByRole('button', { name: 'B cells color' });
    expect(swatch).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(swatch);
    expect(await screen.findByRole('dialog', { name: 'B cells color' })).toBeInTheDocument();
    expect(swatch).toHaveAttribute('aria-expanded', 'true');
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
