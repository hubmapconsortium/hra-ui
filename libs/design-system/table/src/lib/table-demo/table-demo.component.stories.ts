import { MatSortModule } from '@angular/material/sort';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { provideTable } from '../providers';
import { TableDemoData, TableDemoComponent } from './table-demo.component';

/** Example data */
const exampleData: TableDemoData[] = [
  { name: 'Item 1', value: 3 },
  { name: 'Item 2', value: 2 },
  { name: 'Item 3', value: 1 },
];

const meta: Meta<TableDemoComponent> = {
  component: TableDemoComponent,
  title: 'Table',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=37-63',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideAnimations(), provideTable()],
    }),
    moduleMetadata({
      imports: [MatSortModule, TableDemoComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<TableDemoComponent>;

export const Default: Story = {
  args: {
    data: exampleData,
  },
};
