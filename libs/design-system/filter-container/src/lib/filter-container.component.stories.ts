import { Component, OnInit, input, signal } from '@angular/core';
import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import { FilterContainerComponent, FilterChip, RichTooltipConfig } from './filter-container.component';

@Component({
  selector: 'hra-filter-container-demo',
  standalone: true,
  imports: [FilterContainerComponent],
  template: `
    <hra-filter-container [label]="label()" [(chips)]="chips" [tooltip]="tooltip()" [showDivider]="showDivider()" />
  `,
})
class FilterContainerDemoComponent implements OnInit {
  readonly label = input<string>('Action');
  readonly initialChips = input<FilterChip[]>([]);
  readonly tooltip = input<RichTooltipConfig | undefined>(undefined);
  readonly showDivider = input<boolean>(false);

  readonly chips = signal<FilterChip[]>([]);

  ngOnInit() {
    this.chips.set([...this.initialChips()]);
  }
}

const meta: Meta<FilterContainerDemoComponent> = {
  component: FilterContainerDemoComponent,
  title: 'Design System/Filter Container',
  decorators: [
    applicationConfig({
      providers: [],
    }),
  ],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=4896-3821&t=iEqgiqNdW1eC3Rpz-4',
    },
  },
};

export default meta;
type Story = StoryObj<FilterContainerDemoComponent>;

const sampleChips: FilterChip[] = [
  { id: '1', label: 'Option 1' },
  { id: '2', label: 'Option 2' },
  { id: '3', label: 'Option 3' },
];

const sampleTooltip: RichTooltipConfig = {
  description: 'This filter allows you to refine your search by selecting specific options from the available choices.',
  actionText: 'Learn more',
  actionUrl: 'https://example.com',
};

export const Default: Story = {
  args: {
    label: 'Action',
    initialChips: [],
  },
};

export const WithInfoButton: Story = {
  args: {
    label: 'Category',
    tooltip: sampleTooltip,
    initialChips: [],
  },
};

export const WithChipsAndInfo: Story = {
  args: {
    label: 'Category',
    tooltip: sampleTooltip,
    initialChips: sampleChips,
  },
};

export const WithDivider: Story = {
  args: {
    label: 'Category',
    tooltip: sampleTooltip,
    initialChips: sampleChips,
    showDivider: true,
  },
};
