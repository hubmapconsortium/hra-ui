import { render } from '@testing-library/angular';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  it('should create', async () => {
    const { fixture } = await render(ButtonComponent, {
      componentInputs: {
        label: 'Click Me',
        href: 'https://example.com',
        type: 'default',
        variant: 'primary',
        size: 'medium',
        disabled: false,
        icon: 'home',
      },
    });

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the button with correct label', async () => {
    const { getByText } = await render(ButtonComponent, {
      componentInputs: {
        label: 'Click Me',
        href: 'https://example.com',
      },
    });

    expect(getByText('Click Me')).toBeTruthy();
  });
});
