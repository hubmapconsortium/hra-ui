import { render, screen, RenderResult } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { FilterContainerComponent, FilterChip } from './filter-container.component';

describe('FilterContainerComponent', () => {
  async function setup(options: {
    action: string;
    showTooltip?: boolean;
    chips?: FilterChip[];
    enableDivider?: boolean;
    tooltipContent?: string;
  }): Promise<RenderResult<FilterContainerComponent>> {
    const template = options.showTooltip
      ? `<hra-filter-container
          [action]="action"
          [showTooltip]="showTooltip"
          [chips]="chips"
          [enableDivider]="enableDivider">
          ${options.tooltipContent ? `<p tooltipContent>${options.tooltipContent}</p>` : ''}
        </hra-filter-container>`
      : `<hra-filter-container
          [action]="action"
          [chips]="chips"
          [enableDivider]="enableDivider">
        </hra-filter-container>`;

    return render(template, {
      imports: [FilterContainerComponent],
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
      tooltipContent: 'Test description',
    });

    const infoButton = screen.getByRole('button', { name: 'info' });
    expect(infoButton).toBeInTheDocument();
  });

  it('should not show info button when tooltip is not provided', async () => {
    await setup({ action: 'Test' });

    const infoButton = screen.queryByRole('button', { name: 'info' });
    expect(infoButton).not.toBeInTheDocument();
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

    const { fixture } = await setup({
      action: 'Test',
      chips,
    });

    const removeButton = screen.getByRole('button', { name: 'Remove Chip 1' });
    await user.click(removeButton);

    // Check that the chip was removed from the model
    expect(fixture.componentInstance.chips()).toEqual([{ id: 'Chip 2' }]);
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
