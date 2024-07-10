import { render, screen } from '@testing-library/angular';

import { Metadata } from '../../models/metadata';
import { MetadataComponent } from './metadata.component';

describe('MetadataComponent', () => {
  const metadata: Metadata = {
    title: 'Test Visualization',
    sourceData: 'test_data.csv',
    colorMap: 'test_colormap.csv',
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
    });

    expect(screen.getByText(metadata.title ?? '')).toBeInTheDocument();
    expect(screen.getByText(metadata.sourceData ?? '')).toBeInTheDocument();
    expect(screen.getByText(metadata.organ ?? '')).toBeInTheDocument();
    expect(screen.getByText(metadata.technology ?? '')).toBeInTheDocument();
    expect(screen.getByText(metadata.sex ?? '')).toBeInTheDocument();
    expect(screen.getByText(metadata.age ?? '')).toBeInTheDocument();
    expect(screen.getByText(metadata.thickness ?? '')).toBeInTheDocument();
    expect(screen.getByText(metadata.pixelSize ?? '')).toBeInTheDocument();
    expect(screen.getByText('December 17, 1995')).toBeInTheDocument();
    expect(screen.getByText('3:24:00 AM')).toBeInTheDocument();
  });
});
