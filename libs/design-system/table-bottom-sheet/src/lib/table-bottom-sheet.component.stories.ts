import { Component, inject, input } from '@angular/core';
import { type Meta, type StoryObj } from '@storybook/angular';
import { TableColumn, TableRow } from '@hra-ui/design-system/table';
import { TableBottomSheetService } from '../';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'hra-table-bottom-sheet-demo',
  imports: [MatButtonModule],
  template: ` <button mat-flat-button (click)="openBottomSheet()">Open Table Bottom Sheet</button> `,
})
class TableBottomSheetDemoComponent {
  readonly rows = input<TableRow[]>([]);
  readonly columns = input<TableColumn[]>([]);
  readonly hideHeaders = input<boolean>(false);

  private readonly service = inject(TableBottomSheetService);

  openBottomSheet() {
    this.service.openTableBottomSheet({
      rows: this.rows(),
      columns: this.columns(),
      hideHeaders: this.hideHeaders(),
    });
  }
}

const meta: Meta<TableBottomSheetDemoComponent> = {
  component: TableBottomSheetDemoComponent,
  title: 'Design System/Table Bottom Sheet',
  argTypes: {
    rows: {
      control: 'object',
      description: 'Table rows',
    },
    columns: {
      control: 'object',
      description: 'Table columns',
    },
    hideHeaders: {
      control: 'boolean',
      description: 'Whether to hide table headers',
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

type Story = StoryObj<TableBottomSheetDemoComponent>;

export const Default: Story = {
  args: {
    rows: [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
      { name: 'Charlie', age: 35 },
    ],
    columns: [
      { column: 'name', label: 'Name', type: 'text' },
      { column: 'age', label: 'Age', type: 'numeric' },
    ],
    hideHeaders: false,
  },
};

export const WithoutHeaders: Story = {
  args: {
    rows: [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
      { name: 'Charlie', age: 35 },
    ],
    columns: [
      { column: 'name', label: 'Name', type: 'text' },
      { column: 'age', label: 'Age', type: 'numeric' },
    ],
    hideHeaders: true,
  },
};
