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
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).not.toHaveAttribute('target', '_blank');
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

  it('should open external links in a new tab', async () => {
    await render(TextHyperlinkComponent, {
      inputs: {
        text: 'test',
        url: 'https://example.com',
        external: true,
      },
    });

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
