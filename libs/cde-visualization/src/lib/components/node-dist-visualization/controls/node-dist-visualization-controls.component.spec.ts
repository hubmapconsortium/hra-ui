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

  it('labels the view mode toggles', async () => {
    await render(NodeDistVisualizationControlsComponent);

    for (const label of ['Select', 'Inspect', 'Explore']) {
      expect(screen.getByRole('radio', { name: label })).toBeInTheDocument();
    }
  });

  it('is not floating by default', async () => {
    const { fixture } = await render(NodeDistVisualizationControlsComponent);
    expect(fixture.nativeElement).not.toHaveClass('floating');
  });

  it('marks the controls as floating', async () => {
    const { fixture } = await render(NodeDistVisualizationControlsComponent, { inputs: { floating: true } });
    expect(fixture.nativeElement).toHaveClass('floating');
  });
});
