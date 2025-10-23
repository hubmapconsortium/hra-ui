import { MatListModule } from '@angular/material/list';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

const ListItem = { title: 'List Item', line2: 'Secondary text', line3: 'Tertiary text' };

const meta: Meta = {
  title: 'Design System/Normal List/List Item',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=4923-35928',
    },
  },
  decorators: [
    moduleMetadata({
      imports: [MatListModule],
    }),
  ],
  args: {
    item: ListItem,
  },
};
export default meta;

export const Default: StoryObj = {
  render: (args) => ({
    props: args,
    template: `
    <mat-list>
      <mat-list-item togglePosition="before">
        <span matListItemTitle>{{ item.title }}</span>
      </mat-list-item>
    </mat-list>
`,
  }),
};

export const WithSupportingTextSecondary: StoryObj = {
  name: 'With Supporting Text - Secondary',
  render: (args) => ({
    props: args,
    template: `
    <mat-list>
      <mat-list-item togglePosition="before">
        <span matListItemTitle>{{ item.title }}</span>
        <span matListItemLine>{{ item.line2 }}</span>
      </mat-list-item>
    </mat-list>
`,
  }),
};

export const WithSupportingTextTertiary: StoryObj = {
  name: 'With Supporting Text - Tertiary',
  render: (args) => ({
    props: args,
    template: `
    <mat-list>
      <mat-list-item togglePosition="before">
        <span matListItemTitle>{{ item.title }}</span>
        <span matListItemLine>{{ item.line2 }}</span>
        <span matListItemLine>{{ item.line3 }}</span>
      </mat-list-item>
    </mat-list>
`,
  }),
};
