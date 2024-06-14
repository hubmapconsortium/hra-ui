import { render, screen } from '@testing-library/angular';

import { Metadata } from '../../models/metadata';
import { MetadataComponent } from './metadata.component';

describe('MetadataComponent', () => {
  it('should display the metadata information when data is provided', async () => {
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
      creationDate: '2023-04-15',
      creationTime: '10:30:00',
    };

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
    expect(screen.getByText(metadata.creationDate ?? '')).toBeInTheDocument();
    expect(screen.getByText(metadata.creationTime ?? '')).toBeInTheDocument();
  });

  it('should replace undefined values with the string "N/A"', async () => {
    const metadata: Metadata = {
      title: undefined,
      sourceData: 'test_data.csv',
      colorMap: 'test_colormap.csv',
      organ: 'Brain',
      technology: 'MRI',
      sex: 'Male',
      age: 35,
      thickness: 2.5,
      pixelSize: 0.5,
      creationDate: '2023-04-15',
      creationTime: '10:30:00',
    };

    await render(MetadataComponent, {
      componentInputs: {
        metadata,
      },
    });

    expect(screen.getByText('N/A')).toBeInTheDocument();
  });
});
