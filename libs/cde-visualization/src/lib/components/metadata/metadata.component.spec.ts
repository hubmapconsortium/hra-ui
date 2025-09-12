import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { render, screen } from '@testing-library/angular';

import { Metadata } from '../../models/metadata';
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
});
