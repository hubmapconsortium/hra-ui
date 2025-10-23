import { MatListModule } from '@angular/material/list';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

const ListItem = { title: 'List Item', line2: 'Secondary text', line3: 'Tertiary text' };

const meta: Meta = {
  title: 'Design System/Selection List/List Item',
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
    <mat-selection-list>
      <mat-list-option togglePosition="before">
        <span matListItemTitle>{{ item.title }}</span>
      </mat-list-option>
    </mat-selection-list>
`,
  }),
};

export const WithSupportingTextSecondary: StoryObj = {
  name: 'With Supporting Text - Secondary',
  render: (args) => ({
    props: args,
    template: `
    <mat-selection-list>
      <mat-list-option togglePosition="before">
        <span matListItemTitle>{{ item.title }}</span>
        <span matListItemLine>{{ item.line2 }}</span>
      </mat-list-option>
    </mat-selection-list>
`,
  }),
};

export const WithSupportingTextTertiary: StoryObj = {
  name: 'With Supporting Text - Tertiary',
  render: (args) => ({
    props: args,
    template: `
    <mat-selection-list>
      <mat-list-option togglePosition="before">
        <span matListItemTitle>{{ item.title }}</span>
        <span matListItemLine>{{ item.line2 }}</span>
        <span matListItemLine>{{ item.line3 }}</span>
      </mat-list-option>
    </mat-selection-list>
`,
  }),
};

export const SingleSelection: StoryObj = {
  render: (args) => ({
    props: args,
    template: `
    <mat-selection-list multiple="false">
      <mat-list-option togglePosition="before">
        <span matListItemTitle>{{ item.title }}</span>
      </mat-list-option>
    </mat-selection-list>
`,
  }),
};

export const MultipleSelection: StoryObj = {
  render: (args) => ({
    props: args,
    template: `
    <mat-selection-list>
      <mat-list-option togglePosition="before">
        <span matListItemTitle>{{ item.title }}</span>
      </mat-list-option>
    </mat-selection-list>
`,
  }),
};

export const NoLeadingElement: StoryObj = {
  render: (args) => ({
    props: args,
    template: `
    <mat-selection-list hideSingleSelectionIndicator="true" multiple="false">
      <mat-list-option togglePosition="before">
        <span matListItemTitle>{{ item.title }}</span>
      </mat-list-option>
    </mat-selection-list>
`,
  }),
};
