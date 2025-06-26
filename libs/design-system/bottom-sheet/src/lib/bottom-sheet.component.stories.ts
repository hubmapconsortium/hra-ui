import { Component, inject, input } from '@angular/core';
import { BottomSheetComponent, BottomSheetData, BottomSheetVariant } from './bottom-sheet.component';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { TableColumn, TableRow } from '@hra-ui/design-system/table';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { provideDesignSystem } from '@hra-ui/design-system';

@Component({
  selector: 'hra-bottom-sheet-demo',
  standalone: true,
  template: ` <button mat-flat-button (click)="openBottomSheet()">Open Bottom Sheet</button> `,
})
class BottomSheetDemoComponent {
  readonly variant = input<BottomSheetVariant>('table');
  readonly tagline = input<string>('Demo tagline');
  readonly rows = input<TableRow[]>([
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
  ]);
  readonly columns = input<TableColumn[]>([
    { column: 'name', label: 'Name', type: 'text' },
    { column: 'age', label: 'Age', type: 'numeric' },
  ]);

  private readonly bottomSheet = inject(MatBottomSheet);

  openBottomSheet() {
    const data: BottomSheetData = {
      variant: this.variant(),
      tagline: this.tagline(),
      rows: this.variant() === 'table' ? this.rows() : undefined,
      columns: this.variant() === 'table' ? this.columns() : undefined,
    };

    this.bottomSheet.open(BottomSheetComponent, { data });
  }
}

const meta: Meta<BottomSheetDemoComponent> = {
  component: BottomSheetDemoComponent,
  title: 'BottomSheetDemoComponent',
  args: {
    variant: 'table',
    tagline: 'Demo Bottom Sheet',
    rows: [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
    ],
    columns: [
      { column: 'name', label: 'Name', type: 'text' },
      { column: 'age', label: 'Age', type: 'numeric' },
    ],
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['table', 'page-section'],
    },
    tagline: {
      control: 'text',
    },
    rows: {
      control: 'object',
    },
    columns: {
      control: 'object',
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=4132-1621&p=f&t=j4a0ZyhA3Dkh4YFX-0',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
  ],
};
export default meta;
type Story = StoryObj<BottomSheetDemoComponent>;

export const Default: Story = {
  args: {
    variant: 'table',
    tagline: 'Demo Bottom Sheet',
    rows: [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
    ],
    columns: [
      { column: 'name', label: 'Name', type: 'text' },
      { column: 'age', label: 'Age', type: 'numeric' },
    ],
  },
};
