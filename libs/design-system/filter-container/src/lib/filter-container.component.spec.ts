import { render, screen, RenderResult } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { FilterContainerComponent, FilterChip, RichTooltipConfig } from './filter-container.component';

describe('FilterContainerComponent', () => {
  async function setup(options: {
    label: string;
    tooltip?: RichTooltipConfig;
    chips?: FilterChip[];
    showDivider?: boolean;
    on?: {
      filterButtonClick?: jest.Mock;
      chipRemoved?: jest.Mock;
    };
  }): Promise<RenderResult<FilterContainerComponent>> {
    return render(FilterContainerComponent, {
      inputs: {
        label: options.label,
        tooltip: options.tooltip,
        chips: options.chips ?? [],
        showDivider: options.showDivider ?? false,
      },
      on: options.on,
    });
  }

  it('should create', async () => {
    const result = await setup({ label: 'Test Label' });
    expect(result).toBeTruthy();
  });

  it('should display the label', async () => {
    await setup({ label: 'Test Label' });

    const button = screen.getByRole('button', { name: 'Test Label' });
    expect(button).toBeInTheDocument();
  });

  it('should show info button when tooltip is provided', async () => {
    const tooltip: RichTooltipConfig = {
      description: 'Test description',
    };

    await setup({
      label: 'Test',
      tooltip,
    });

    const infoButton = screen.getByLabelText('Click for more information');
    expect(infoButton).toBeInTheDocument();
  });

  it('should not show info button when tooltip is not provided', async () => {
    await setup({ label: 'Test' });

    const infoButton = screen.queryByLabelText('Click for more information');
    expect(infoButton).not.toBeInTheDocument();
  });

  it('should display chips', async () => {
    const chips: FilterChip[] = [
      { id: '1', label: 'Chip 1' },
      { id: '2', label: 'Chip 2' },
    ];

    await setup({
      label: 'Test',
      chips,
    });

    expect(screen.getByText('Chip 1')).toBeInTheDocument();
    expect(screen.getByText('Chip 2')).toBeInTheDocument();
  });

  it('should emit filterButtonClick when button is clicked', async () => {
    const user = userEvent.setup();
    const filterButtonClick = jest.fn();

    await setup({
      label: 'Test',
      on: { filterButtonClick },
    });

    const button = screen.getByRole('button', { name: 'Test' });
    await user.click(button);

    expect(filterButtonClick).toHaveBeenCalledTimes(1);
  });

  it('should emit chipRemoved when chip remove button is clicked', async () => {
    const user = userEvent.setup();
    const chipRemoved = jest.fn();
    const chips: FilterChip[] = [{ id: '1', label: 'Chip 1' }];

    await setup({
      label: 'Test',
      chips,
      on: { chipRemoved },
    });

    const removeButton = screen.getByRole('button', { name: 'Remove Chip 1' });
    await user.click(removeButton);

    expect(chipRemoved).toHaveBeenCalledWith(chips[0]);
  });

  it('should show divider when showDivider is true', async () => {
    const { container } = await setup({
      label: 'Test',
      showDivider: true,
    });

    const divider = container.querySelector('mat-divider');
    expect(divider).toBeInTheDocument();
  });

  it('should not show divider when showDivider is false', async () => {
    const { container } = await setup({
      label: 'Test',
      showDivider: false,
    });

    const divider = container.querySelector('mat-divider');
    expect(divider).not.toBeInTheDocument();
  });
});
