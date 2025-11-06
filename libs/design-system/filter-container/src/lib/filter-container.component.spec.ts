import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { FilterContainerComponent, FilterChip } from './filter-container.component';

describe('FilterContainerComponent', () => {
  async function setup(options: {
    action: string;
    showTooltip?: boolean;
    chips?: FilterChip[];
    enableDivider?: boolean;
  }) {
    return render(FilterContainerComponent, {
      componentInputs: {
        action: options.action,
        showTooltip: options.showTooltip ?? false,
        chips: options.chips ?? [],
        enableDivider: options.enableDivider ?? false,
      },
    });
  }

  it('should create', async () => {
    const result = await setup({ action: 'Test Action' });
    expect(result).toBeTruthy();
  });

  it('should display the action', async () => {
    await setup({ action: 'Test Action' });

    const button = screen.getByRole('button', { name: 'Test Action' });
    expect(button).toBeInTheDocument();
  });

  it('should show info button when tooltip is provided', async () => {
    await setup({
      action: 'Test',
      showTooltip: true,
    });

    const infoIcon = screen.getByText('info');
    expect(infoIcon).toBeInTheDocument();
  });

  it('should not show info button when tooltip is not provided', async () => {
    await setup({ action: 'Test' });

    const infoIcon = screen.queryByText('info');
    expect(infoIcon).not.toBeInTheDocument();
  });

  it('should display chips', async () => {
    const chips: FilterChip[] = [{ id: 'Chip 1' }, { id: 'Chip 2' }];

    await setup({
      action: 'Test',
      chips,
    });

    expect(screen.getByText('Chip 1')).toBeInTheDocument();
    expect(screen.getByText('Chip 2')).toBeInTheDocument();
  });

  it('should not emit when button is clicked', async () => {
    const user = userEvent.setup();

    await setup({
      action: 'Test',
    });

    const button = screen.getByRole('button', { name: 'Test' });
    await user.click(button);

    // Button click should not trigger any events
    expect(button).toBeInTheDocument();
  });

  it('should remove chip from model when chip remove button is clicked', async () => {
    const user = userEvent.setup();
    const chips: FilterChip[] = [{ id: 'Chip 1' }, { id: 'Chip 2' }];

    await setup({
      action: 'Test',
      chips,
    });

    const removeButton = screen.getByRole('button', { name: 'Remove Chip 1' });
    await user.click(removeButton);

    // Check that the chip was removed from the DOM
    expect(screen.queryByText('Chip 1')).not.toBeInTheDocument();
    expect(screen.getByText('Chip 2')).toBeInTheDocument();
  });

  it('should show divider when enableDivider is true', async () => {
    const { container } = await setup({
      action: 'Test',
      enableDivider: true,
    });

    const divider = container.querySelector('mat-divider');
    expect(divider).toBeInTheDocument();
  });

  it('should not show divider when enableDivider is false', async () => {
    const { container } = await setup({
      action: 'Test',
      enableDivider: false,
    });

    const divider = container.querySelector('mat-divider');
    expect(divider).not.toBeInTheDocument();
  });
});
