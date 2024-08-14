import { render } from '@testing-library/angular';
import { DividerComponent } from './divider.component';

describe('DividerComponent', () => {
  it('should render horizontal divider', async () => {
    const { fixture } = await render(DividerComponent);
    expect(fixture.componentInstance).toBeDefined();
  });

  it('should render vertical divider', async () => {
    const { fixture } = await render(DividerComponent, {
      componentInputs: {
        vertical: true,
      },
    });
    expect(fixture.componentInstance).toBeDefined();
  });
});
