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

  it('should render the panel title', async () => {
    await render(MetadataComponent, {
      componentInputs: { metadata },
      providers: [provideNoopAnimations()],
    });

    expect(screen.getByText('Metadata')).toBeInTheDocument();
  });

  describe('downloads button', () => {
    async function setup(downloadsOpen?: boolean) {
      const downloadsClick = jest.fn();
      const result = await render(MetadataComponent, {
        inputs: { metadata, ...(downloadsOpen !== undefined && { downloadsOpen }) },
        on: { downloadsClick },
        providers: [provideNoopAnimations()],
      });
      const button = screen.getByRole('button', { name: DOWNLOADS_CONTENT.title });
      return { ...result, button, downloadsClick };
    }

    it('should open a dialog and report whether it is expanded', async () => {
      const { button, fixture } = await setup();
      expect(button).toHaveAttribute('aria-haspopup', 'dialog');
      expect(button).toHaveAttribute('aria-expanded', 'false');

      fixture.componentRef.setInput('downloadsOpen', true);
      await fixture.whenStable();
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('should emit downloadsClick when clicked', async () => {
      const { button, downloadsClick } = await setup();
      fireEvent.click(button);
      expect(downloadsClick).toHaveBeenCalled();
    });

    it('should move focus to the button', async () => {
      const { button, fixture } = await setup(true);
      fixture.componentInstance.focusDownloadsButton('keyboard');
      expect(button).toHaveFocus();
    });
  });
});
