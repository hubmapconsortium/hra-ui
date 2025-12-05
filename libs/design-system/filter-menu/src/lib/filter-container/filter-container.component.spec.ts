import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { FilterContainerComponent } from './filter-container.component';
import { SearchListOption } from '@hra-ui/design-system/search-list';

describe('FilterContainerComponent', () => {
  async function setup(options: {
    action: string;
    showTooltip?: boolean;
    selected?: SearchListOption[];
    enableDivider?: boolean;
  }) {
    return render(FilterContainerComponent, {
      componentInputs: {
        filter: {
          options: [
            { id: 'option1', label: 'Option 1' },
            { id: 'option2', label: 'Option 2' },
            { id: 'option3', label: 'Option 3' },
          ],
        },
        action: options.action,
        showTooltip: options.showTooltip ?? false,
        selected: options.selected ?? [],
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
    const selected: SearchListOption[] = [
      { id: 'option1', label: 'Option 1' },
      { id: 'option2', label: 'Option 2' },
    ];

    await setup({
      action: 'Test',
      selected,
    });

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('should emit actionClick when category button is clicked', async () => {
    const user = userEvent.setup();

    const { fixture } = await setup({
      action: 'Test',
    });

    const actionClick = jest.fn();
    fixture.componentInstance.actionClick.subscribe(actionClick);

    const button = screen.getByRole('button', { name: 'Test' });
    await user.click(button);

    expect(actionClick).toHaveBeenCalledTimes(1);
  });

  it('should remove chip from model when chip remove button is clicked', async () => {
    const user = userEvent.setup();
    const selected: SearchListOption[] = [
      { id: 'option1', label: 'Option 1' },
      { id: 'option2', label: 'Option 2' },
    ];

    await setup({
      action: 'Test',
      selected,
    });

    const removeButton = screen.getByRole('button', { name: 'Remove Option 1' });
    await user.click(removeButton);

    // Check that the chip was removed from the DOM
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('should update chips when option in search list is clicked', async () => {
    const user = userEvent.setup();
    const selected: SearchListOption[] = [
      { id: 'option1', label: 'Option 1' },
      { id: 'option2', label: 'Option 2' },
    ];

    await setup({
      action: 'Test',
      selected,
    });

    const button = screen.getByRole('button', { name: 'Test' });
    await user.click(button);
    const option = screen.getByRole('option', { name: 'Toggle option1' });
    await user.click(option);

    // Check that the chip was removed from the DOM
    expect(screen.queryByText('Remove Option 1')).not.toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
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
