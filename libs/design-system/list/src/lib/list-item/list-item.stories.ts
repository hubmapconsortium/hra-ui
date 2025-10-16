import { MatListModule } from '@angular/material/list';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ListItemComponent } from './list-item.component';

const meta: Meta = {
  title: 'Design System/List/List Item',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=4923-35928',
    },
  },
  decorators: [
    moduleMetadata({
      imports: [MatListModule, ListItemComponent],
    }),
  ],
  args: {
    title: 'List Item Title',
    line2: 'Secondary text',
    line3: 'Tertiary text',
  },
};
export default meta;

export const Default: StoryObj = {
  render: () => ({
    template: `
    <mat-selection-list>
      <hra-list-item
        title="List Item Title"
        line2="Secondary text"
        line3="Tertiary text"
      ></hra-list-item>
    </mat-selection-list>
`,
  }),
};
