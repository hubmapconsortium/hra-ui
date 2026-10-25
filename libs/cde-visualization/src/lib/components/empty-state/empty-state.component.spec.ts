import { fireEvent, render, screen } from '@testing-library/angular';
import { EmptyStateComponent } from './empty-state.component';
import { NO_CELL_TYPES_SELECTED_CONTENT, noDistancesContent } from './empty-state.content';

describe('EmptyStateComponent', () => {
  it('should render the heading, description, and action', async () => {
    await render(EmptyStateComponent, { inputs: { content: NO_CELL_TYPES_SELECTED_CONTENT } });

    expect(screen.getByText(NO_CELL_TYPES_SELECTED_CONTENT.heading)).toBeInTheDocument();
    expect(screen.getByText(NO_CELL_TYPES_SELECTED_CONTENT.description)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: NO_CELL_TYPES_SELECTED_CONTENT.actionLabel })).toBeInTheDocument();
  });

  it('should emit when the action is clicked', async () => {
    const actionClick = jest.fn();
    await render(EmptyStateComponent, { inputs: { content: NO_CELL_TYPES_SELECTED_CONTENT }, on: { actionClick } });

    fireEvent.click(screen.getByRole('button', { name: NO_CELL_TYPES_SELECTED_CONTENT.actionLabel }));
    expect(actionClick).toHaveBeenCalled();
  });

  it('should name the anchor cell type when there are no distances', () => {
    expect(noDistancesContent('endothelial').description).toContain('endothelial');
  });
});
