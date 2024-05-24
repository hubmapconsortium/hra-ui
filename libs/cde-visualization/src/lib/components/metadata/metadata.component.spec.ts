import { Metadata, MetadataComponent } from './metadata.component';
import { render, screen } from '@testing-library/angular';
import '@testing-library/jest-dom';

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
        data: metadata,
      },
    });

    expect(screen.getByText(metadata.title)).toBeInTheDocument();
    expect(screen.getByText(metadata.sourceData)).toBeInTheDocument();
    expect(screen.getByText(metadata.organ)).toBeInTheDocument();
    expect(screen.getByText(metadata.technology)).toBeInTheDocument();
    expect(screen.getByText(metadata.sex)).toBeInTheDocument();
    expect(screen.getByText(metadata.age.toString())).toBeInTheDocument();
    expect(screen.getByText(metadata.thickness.toString())).toBeInTheDocument();
    expect(screen.getByText(metadata.pixelSize.toString())).toBeInTheDocument();
    expect(screen.getByText(metadata.creationDate)).toBeInTheDocument();
    expect(screen.getByText(metadata.creationTime)).toBeInTheDocument();
  });
});
