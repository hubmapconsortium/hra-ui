import { fireEvent, render, screen } from '@testing-library/angular';
import { EmptyStateComponent } from './empty-state.component';
import {
  allCellsDeletedContent,
  distancesDeletedContent,
  NO_CELL_TYPES_SELECTED_CONTENT,
  noDistancesContent,
} from './empty-state.content';

describe('EmptyStateComponent', () => {
  it('should render the heading, description, and action', async () => {
    await render(EmptyStateComponent, { inputs: { content: NO_CELL_TYPES_SELECTED_CONTENT } });

    const [{ label }] = NO_CELL_TYPES_SELECTED_CONTENT.actions;
    expect(screen.getByText(NO_CELL_TYPES_SELECTED_CONTENT.heading)).toBeInTheDocument();
    expect(screen.getByText(NO_CELL_TYPES_SELECTED_CONTENT.description)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
  });

  it('should emit the action of the clicked button', async () => {
    const actionClick = jest.fn();
    await render(EmptyStateComponent, { inputs: { content: allCellsDeletedContent(true) }, on: { actionClick } });

    expect(screen.getAllByRole('button').map((button) => button.textContent?.trim())).toEqual([
      'Undo',
      'Restore deleted cells',
    ]);

    fireEvent.click(screen.getByRole('button', { name: 'Undo' }));
    expect(actionClick).toHaveBeenLastCalledWith('undo');
    fireEvent.click(screen.getByRole('button', { name: 'Restore deleted cells' }));
    expect(actionClick).toHaveBeenLastCalledWith('restore-deleted-cells');
  });

  it('should name the anchor cell type when there are no distances', () => {
    expect(noDistancesContent('endothelial').description).toContain('endothelial');
    expect(distancesDeletedContent('endothelial', true).description).toContain('endothelial');
  });

  it('should offer Undo only when the last change can be undone', () => {
    const actions = (undoAvailable: boolean) =>
      distancesDeletedContent('endothelial', undoAvailable).actions.map(({ action }) => action);

    expect(actions(true)).toEqual(['undo', 'restore-deleted-cells']);
    expect(actions(false)).toEqual(['restore-deleted-cells']);
  });
});
