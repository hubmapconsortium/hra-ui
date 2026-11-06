import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { render, screen } from '@testing-library/angular';

import { Metadata } from '../../models/metadata';
import { hasHiddenFields, MetadataComponent } from './metadata.component';

describe('MetadataComponent', () => {
  const metadata: Metadata = {
    title: 'Test Visualization',
    sourceFileName: 'test_data.csv',
    colorMapFileName: 'test_colormap.csv',
    organ: 'Brain',
    technology: 'MRI',
    sex: 'Male',
    age: 35,
    thickness: 2.5,
    pixelSize: 0.5,
    creationTimestamp: +new Date('December 17, 1995 03:24:00'),
  };

  it('should display the metadata information when data is provided', async () => {
    await render(MetadataComponent, {
      componentInputs: {
        metadata,
      },
      providers: [provideNoopAnimations()],
    });

    expect(screen.getByText(metadata.title ?? '')).toBeInTheDocument();
    expect(screen.getByText(metadata.sourceFileName ?? '')).toBeInTheDocument();
    expect(screen.getByText(metadata.organ ?? '')).toBeInTheDocument();
    expect(screen.getByText(metadata.technology ?? '')).toBeInTheDocument();
    expect(screen.getByText(metadata.sex ?? '')).toBeInTheDocument();
    expect(screen.getByText(metadata.age ?? '')).toBeInTheDocument();
    expect(screen.getByText(metadata.thickness ?? '')).toBeInTheDocument();
    expect(screen.getByText(metadata.pixelSize ?? '')).toBeInTheDocument();
    expect(screen.getByText('December 17, 1995')).toBeInTheDocument();
    expect(screen.getByText('3:24:00 AM')).toBeInTheDocument();
  });

  it('should show skeleton rows in place of the fields while loading', async () => {
    const { container } = await render(MetadataComponent, {
      componentInputs: { metadata, loading: true },
      providers: [provideNoopAnimations()],
    });
    const details = container.querySelector('.metadata-details');

    expect(details).toHaveAttribute('aria-busy', 'true');
    expect(details?.querySelectorAll('cde-skeleton')).toHaveLength(12);
    expect(screen.queryByText(metadata.organ ?? '')).not.toBeInTheDocument();
  });

  it('should report whether any fields only show with all metadata', () => {
    expect(hasHiddenFields(metadata)).toBe(false);
    expect(hasHiddenFields({ ...metadata, organ: undefined })).toBe(true);
  });

  it('should hide empty metadata fields', async () => {
    const { rerender } = await render(MetadataComponent, {
      componentInputs: {
        metadata: {
          ...metadata,
          creationTimestamp: undefined,
        },
      },
      providers: [provideNoopAnimations()],
    });

    expect(screen.queryByText('Creation date')).toBeNull();
    await rerender({ componentInputs: { showEmptyFields: true }, partialUpdate: true });
    expect(screen.getByText('Creation date')).toBeInTheDocument();
  });

  it('should show the placeholder creation date and time of example datasets only with all metadata', async () => {
    const exampleMetadata: Metadata = {
      ...metadata,
      sampleExtra: {
        type: '2D',
        organ: 'Brain',
        sampleUrl: 'https://example.com',
        sourceDataUrl: 'https://example.com',
      },
    };
    const { rerender } = await render(MetadataComponent, {
      componentInputs: { metadata: exampleMetadata },
      providers: [provideNoopAnimations()],
    });

    expect(hasHiddenFields(exampleMetadata)).toBe(true);
    expect(screen.queryByText('Creation date')).toBeNull();
    expect(screen.queryByText('Creation time')).toBeNull();
    await rerender({ componentInputs: { showEmptyFields: true }, partialUpdate: true });
    expect(screen.getByText('Creation date')).toBeInTheDocument();
    expect(screen.getByText('December 17, 1995')).toBeInTheDocument();
  });

  it('should render the panel title', async () => {
    await render(MetadataComponent, {
      componentInputs: { metadata },
      providers: [provideNoopAnimations()],
    });

    expect(screen.getByText('Metadata')).toBeInTheDocument();
  });

  it('should show the source publication link without its protocol', async () => {
    const sampleUrl = 'https://doi.org/10.1016/j.cell.2022.12.028';
    await render(MetadataComponent, {
      componentInputs: {
        metadata: {
          ...metadata,
          sampleExtra: { type: '2D', organ: 'Brain', sampleUrl, sourceDataUrl: 'https://example.com/data.csv' },
        },
      },
      providers: [provideNoopAnimations()],
    });

    const link = screen.getByRole('link', { name: 'doi.org/10.1016/j.cell.2022.12.028' });
    expect(link).toHaveAttribute('href', sampleUrl);
  });
});
