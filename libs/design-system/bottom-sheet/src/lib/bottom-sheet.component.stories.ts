import { Component, inject, input } from '@angular/core';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { TableColumn, TableRow } from '@hra-ui/design-system/table';
import { provideDesignSystem } from '@hra-ui/design-system';
import { BottomSheetService } from '../bottom-sheet.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'hra-table-bottom-sheet-demo',
  standalone: true,
  imports: [MatButtonModule],
  template: ` <button mat-flat-button (click)="openTableBottomSheet()">Open Table Bottom Sheet</button> `,
})
class TableBottomSheetDemoComponent {
  readonly rows = input<TableRow[]>([
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
  ]);
  readonly columns = input<TableColumn[]>([
    { column: 'name', label: 'Name', type: 'text' },
    { column: 'age', label: 'Age', type: 'numeric' },
  ]);

  private readonly service = inject(BottomSheetService);

  openTableBottomSheet() {
    this.service.openTableBottomSheet(this.rows(), this.columns());
  }
}

@Component({
  selector: 'hra-page-section-bottom-sheet-demo',
  standalone: true,
  imports: [MatButtonModule],
  template: ` <button mat-flat-button (click)="openPageSectionBottomSheet()">Open Page Section Bottom Sheet</button> `,
})
class PageSectionBottomSheetDemoComponent {
  readonly tagline = input<string>('Demo tagline');

  private readonly service = inject(BottomSheetService);

  openPageSectionBottomSheet() {
    this.service.openPageSectionBottomSheet(this.tagline());
  }
}

const tableMeta: Meta<TableBottomSheetDemoComponent> = {
  component: TableBottomSheetDemoComponent,
  title: 'BottomSheet/Table',
  args: {
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

const pageSectionMeta: Meta<PageSectionBottomSheetDemoComponent> = {
  component: PageSectionBottomSheetDemoComponent,
  title: 'BottomSheet/PageSection',
  args: {
    tagline: 'This is a page section demo',
  },
  argTypes: {
    tagline: {
      control: 'text',
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

export default tableMeta;
export { pageSectionMeta };

type TableStory = StoryObj<TableBottomSheetDemoComponent>;
type PageSectionStory = StoryObj<PageSectionBottomSheetDemoComponent>;

export const TableBottomSheet: TableStory = {
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
  },
};

export const PageSectionBottomSheet: PageSectionStory = {
  parameters: {
    ...pageSectionMeta.parameters,
  },
  decorators: pageSectionMeta.decorators,
  render: (args) => ({
    component: PageSectionBottomSheetDemoComponent,
    props: args,
  }),
  args: {
    tagline: 'This is a page section bottom sheet demo',
  },
};
