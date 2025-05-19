import { render, screen } from '@testing-library/angular';
import { TextHyperlinkComponent } from './text-hyperlink.component';

describe('TextHyperlinkComponent', () => {
  it('should use regular links for absolute urls', async () => {
    await render(TextHyperlinkComponent, {
      inputs: {
        text: 'test',
        url: 'https://example.com',
      },
    });

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('should use router links for relative urls', async () => {
    await render(TextHyperlinkComponent, {
      inputs: {
        text: 'test',
        url: 'foo',
      },
    });

    const link = screen.getByRole('link');
    expect(link).not.toHaveAttribute('target', '_blank');
  });
});
