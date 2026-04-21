import { RenderComponentOptions, render, screen } from '@testing-library/angular';
import { SkipToContentButtonComponent } from './skip-to-content-button.component';

describe('SkipToContentButtonComponent', () => {
  const anchorId = 'main-content';
  const customLabel = 'Skip to section';

  function setup(options?: RenderComponentOptions<SkipToContentButtonComponent>) {
    return render(SkipToContentButtonComponent, {
      ...options,
      inputs: {
        anchorId,
        ...options?.inputs,
      },
    });
  }

  it('renders the default label', async () => {
    await setup();

    expect(screen.getByRole('link', { name: 'Skip to main content' })).toBeInTheDocument();
  });

  it('renders a custom label when provided', async () => {
    await setup({ inputs: { label: customLabel } });

    expect(screen.getByRole('link', { name: customLabel })).toBeInTheDocument();
  });

  it('sets the fragment href from anchorId and normalizes a leading hash', async () => {
    await setup({ inputs: { anchorId: '#target-section' } });

    expect(screen.getByRole('link')).toHaveAttribute('href', '#target-section');
  });
});
