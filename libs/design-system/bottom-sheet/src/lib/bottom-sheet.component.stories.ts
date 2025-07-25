import { Component, inject, input } from '@angular/core';
import { type Meta, type StoryObj } from '@storybook/angular';
import { TableColumn, TableRow } from '@hra-ui/design-system/table';
import { BottomSheetService } from '../bottom-sheet.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'hra-bottom-sheet-demo',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <button mat-flat-button (click)="openBottomSheet()">
      Open {{ variant() === 'table' ? 'Table' : 'Page Section' }} Bottom Sheet
    </button>
  `,
})
class BottomSheetDemoComponent {
  readonly variant = input.required<'table' | 'page-section'>();
  readonly tagline = input<string>('');
  readonly rows = input<TableRow[]>([]);
  readonly columns = input<TableColumn[]>([]);

  private readonly service = inject(BottomSheetService);

  openBottomSheet() {
    if (this.variant() === 'table') {
      this.service.openTableBottomSheet(this.rows(), this.columns());
    } else {
      this.service.openPageSectionBottomSheet(this.tagline());
    }
  }
}

const meta: Meta<BottomSheetDemoComponent> = {
  component: BottomSheetDemoComponent,
  title: 'Design System/Bottom Sheet',
  argTypes: {
    variant: {
      control: 'select',
      options: ['table', 'page-section'],
      description: 'Select the bottom sheet variant to display',
    },
    rows: {
      control: 'object',
      if: { arg: 'variant', eq: 'table' },
      description: 'Table rows (for table bottom sheets)',
    },
    columns: {
      control: 'object',
      if: { arg: 'variant', eq: 'table' },
      description: 'Table columns (for table bottom sheets)',
    },
    tagline: {
      control: 'text',
      if: { arg: 'variant', eq: 'page-section' },
      description: 'Tagline text (for page section bottom sheets)',
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=4132-1621&p=f&t=j4a0ZyhA3Dkh4YFX-0',
    },
  },
};

export default meta;

type Story = StoryObj<BottomSheetDemoComponent>;

export const TableBottomSheet: Story = {
  args: {
    variant: 'table',
    rows: [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
      { name: 'Charlie', age: 35 },
    ],
    columns: [
      { column: 'name', label: 'Name', type: 'text' },
      { column: 'age', label: 'Age', type: 'numeric' },
    ],
  },
};

export const PageSectionBottomSheet: Story = {
  args: {
    variant: 'page-section',
    tagline: 'This is a page section bottom sheet demo',
  },
};
