import { render } from '@testing-library/angular';
import { IconComponent } from './icon.component';

describe('IconComponent', () => {
  it('should create', async () => {
    const component = await render(IconComponent, {
      componentInputs: {
        icon: { svgIcon: 'product:ftu' },
      },
    });
    expect(component).toBeTruthy();
  });
});
