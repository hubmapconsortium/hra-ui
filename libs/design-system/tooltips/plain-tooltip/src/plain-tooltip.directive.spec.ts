import { Component } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { render } from '@testing-library/angular';
import { PlainTooltipDirective, providePlainTooltipOptions } from './plain-tooltip.directive';

@Component({
  selector: 'hra-test-host',
  imports: [PlainTooltipDirective],
  template: '<button hraPlainTooltip="Tooltip" hraPlainTooltipSize="small">Button</button>',
})
class TestHostComponent {}

describe('PlainTooltipDirective', () => {
  async function getTooltipClass(...providers: ReturnType<typeof providePlainTooltipOptions>[]) {
    const { debugElement } = await render(TestHostComponent, { providers });
    const tooltip = debugElement.children[0].injector.get(MatTooltip);
    return tooltip.tooltipClass;
  }

  it('adds the HRA plain tooltip classes by default', async () => {
    expect(await getTooltipClass()).toEqual(['hra-plain-tooltip', 'hra-plain-tooltip-small']);
  });

  it('keeps the default Material tooltip styles when the HRA styles are turned off', async () => {
    expect(await getTooltipClass(providePlainTooltipOptions({ hraStyles: false }))).toBeFalsy();
  });
});
