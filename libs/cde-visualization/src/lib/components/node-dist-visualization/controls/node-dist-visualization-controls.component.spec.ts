import { render, screen } from '@testing-library/angular';
import { NodeDistVisualizationControlsComponent } from './node-dist-visualization-controls.component';

describe('NodeDistVisualizationControlsComponent', () => {
  it('should create', async () => {
    await expect(render(NodeDistVisualizationControlsComponent)).resolves.toBeDefined();
  });

  it('shows the delete button only while cells are selected', async () => {
    const { rerender } = await render(NodeDistVisualizationControlsComponent);
    expect(screen.queryByRole('button', { name: 'Delete selected cells' })).not.toBeInTheDocument();

    await rerender({ inputs: { deleteAvailable: true }, partialUpdate: true });
    expect(screen.getByRole('button', { name: 'Delete selected cells' })).toBeInTheDocument();
  });

  it('shows the view mode toggles as icons on compact screens, still named by their labels', async () => {
    const { rerender } = await render(NodeDistVisualizationControlsComponent);
    expect(screen.queryByText('highlight_alt')).not.toBeInTheDocument();
    expect(screen.getByText('Select')).not.toHaveClass('visually-hidden');

    await rerender({ inputs: { compact: true }, partialUpdate: true });
    expect(screen.getByText('highlight_alt')).toBeInTheDocument();
    expect(screen.getByText('Select')).toHaveClass('visually-hidden');
  });
});
