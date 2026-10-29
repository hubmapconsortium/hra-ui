import { fireEvent, render, screen } from '@testing-library/angular';
import { DownloadFileContent } from '../downloads.content';
import { DownloadFileComponent } from './download-file.component';

describe('DownloadFileComponent', () => {
  const file: DownloadFileContent = {
    id: 'violin-graph',
    name: 'Violin graph',
    description: 'Distance distribution for each cell type.',
    formats: [
      { id: 'png', label: 'PNG', ariaLabel: 'Download violin graph PNG' },
      { id: 'svg', label: 'SVG', ariaLabel: 'Download violin graph SVG' },
    ],
  };

  it('should render the name, description and a button for each format', async () => {
    await render(DownloadFileComponent, { inputs: { file } });

    expect(screen.getByText(file.name)).toBeInTheDocument();
    expect(screen.getByText(file.description)).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(file.formats.length);
  });

  it('should disable every format button when the file is disabled', async () => {
    await render(DownloadFileComponent, { inputs: { file, disabled: true } });

    for (const button of screen.getAllByRole('button')) {
      expect(button).toBeDisabled();
    }
  });

  it('should emit the format of the clicked button', async () => {
    const download = jest.fn();
    await render(DownloadFileComponent, { inputs: { file }, on: { download } });

    fireEvent.click(screen.getByRole('button', { name: 'Download violin graph SVG' }));
    expect(download).toHaveBeenCalledWith('svg');
  });
});
