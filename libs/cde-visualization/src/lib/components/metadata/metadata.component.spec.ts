import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { fireEvent, render, screen } from '@testing-library/angular';

import { Metadata } from '../../models/metadata';
import { DOWNLOADS_CONTENT } from '../downloads/downloads.content';
import { MetadataComponent } from './metadata.component';

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

  it('should toggle the empty fields signal', async () => {
    const { fixture } = await render(MetadataComponent, {
      componentInputs: {
        metadata,
      },
      providers: [provideNoopAnimations()],
    });
    const component = fixture.componentInstance;
    component.toggleEmptyFields();
    expect(component.showEmptyFields()).toBe(true);
    component.toggleEmptyFields();
    expect(component.showEmptyFields()).toBe(false);
  });

  it('should hide empty metadata fields', async () => {
    const { fixture } = await render(MetadataComponent, {
      componentInputs: {
        metadata: {
          ...metadata,
          creationTimestamp: undefined,
        },
      },
      providers: [provideNoopAnimations()],
    });

    expect(screen.queryByText('Creation date')).toBeNull();
    fixture.componentInstance.toggleEmptyFields();
    fixture.detectChanges();
    expect(screen.getByText('Creation date')).toBeInTheDocument();
  });

  it('should show the placeholder creation date and time of example datasets only with all metadata', async () => {
    const { fixture } = await render(MetadataComponent, {
      componentInputs: {
        metadata: {
          ...metadata,
          sampleExtra: {
            type: '2D',
            organ: 'Brain',
            sampleUrl: 'https://example.com',
            sourceDataUrl: 'https://example.com',
          },
        },
      },
      providers: [provideNoopAnimations()],
    });

    expect(fixture.componentInstance.hasEmptyFields()).toBe(true);
    expect(screen.queryByText('Creation date')).toBeNull();
    expect(screen.queryByText('Creation time')).toBeNull();
    fixture.componentInstance.toggleEmptyFields();
    fixture.detectChanges();
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

  describe('downloads button', () => {
    async function setup() {
      const downloadsOpenChange = jest.fn();
      const result = await render(MetadataComponent, {
        inputs: { metadata },
        on: { downloadsOpen: downloadsOpenChange },
        providers: [provideNoopAnimations()],
      });
      const button = screen.getByRole('button', { name: DOWNLOADS_CONTENT.title });
      return { ...result, button, downloadsOpenChange };
    }

    it('should report whether the downloads drawer is expanded', async () => {
      const { button, fixture } = await setup();
      expect(button).toHaveAttribute('aria-expanded', 'false');

      fixture.componentRef.setInput('downloadsOpen', true);
      await fixture.whenStable();
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('should open the downloads drawer when clicked', async () => {
      const { button, downloadsOpenChange } = await setup();
      fireEvent.click(button);
      expect(downloadsOpenChange).toHaveBeenCalledWith(true);
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });
  });
});
