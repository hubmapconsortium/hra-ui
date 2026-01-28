import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { MetadataCardComponent } from './metadata-card.component';

describe('MetadataCardComponent', () => {
  const inputs = {
    tagline: 'Sample Title',
    label: 'Primary label',
    label2: 'Secondary label',
    menuLink: 'https://example.com/source',
  } as const;

  it('renders headings, optional label, and link', async () => {
    await render(MetadataCardComponent, {
      inputs,
    });

    expect(screen.getByText(inputs.tagline)).toBeInTheDocument();
    expect(screen.getByText(inputs.label)).toBeInTheDocument();
    expect(screen.getByText(inputs.label2)).toBeInTheDocument();

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', inputs.menuLink);
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('emits toggleExpansion when header is clicked', async () => {
    const toggleExpansion = jest.fn();

    await render(MetadataCardComponent, {
      inputs,
      on: { toggleExpansion },
    });

    await userEvent.click(screen.getByText(inputs.tagline));
    expect(toggleExpansion).toHaveBeenCalledTimes(1);
  });
});

describe('MetadataCardComponent', () => {
  const inputs = {
    tagline: 'Sample Title',
    label: 'Primary label',
    label2: 'Secondary label',
    menuLink: 'https://example.com/source',
  } as const;

  it('renders headings, optional label, and link', async () => {
    await render(MetadataCardComponent, {
      inputs,
    });

    expect(screen.getByText(inputs.tagline)).toBeInTheDocument();
    expect(screen.getByText(inputs.label)).toBeInTheDocument();
    expect(screen.getByText(inputs.label2)).toBeInTheDocument();

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', inputs.menuLink);
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('emits toggleExpansion when header is clicked', async () => {
    const toggleExpansion = jest.fn();

    await render(MetadataCardComponent, {
      inputs,
      on: { toggleExpansion },
    });

    await userEvent.click(screen.getByText(inputs.tagline));
    expect(toggleExpansion).toHaveBeenCalledTimes(1);
  });
});
