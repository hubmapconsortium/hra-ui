import { MatListModule } from '@angular/material/list';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ListItemComponent } from './list-item.component';

const ListItem = { title: 'List Item', line2: 'Secondary text', line3: 'Tertiary text' };

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
    item: ListItem,
  },
};
export default meta;

export const Default: StoryObj = {
  render: (args) => ({
    props: args,
    template: `
    <mat-selection-list>
      <hra-list-item title="{{ item.title }}" />
    </mat-selection-list>
`,
  }),
};

export const WithSupportingText: StoryObj = {
  render: (args) => ({
    props: args,
    template: `
    <mat-selection-list>
      <hra-list-item
        title="{{ item.title }}"
        line2="{{ item.line2 }}"
        line3="{{ item.line3 }}"
      />
    </mat-selection-list>
`,
  }),
};

export const SingleSelection: StoryObj = {
  render: (args) => ({
    props: args,
    template: `
    <mat-selection-list multiple="false">
      <hra-list-item
        title="{{ item.title }}"
      />
    </mat-selection-list>
`,
  }),
};

export const MultipleSelection: StoryObj = {
  render: (args) => ({
    props: args,
    template: `
    <mat-selection-list>
      <hra-list-item
        title="{{ item.title }}"
      />
    </mat-selection-list>
`,
  }),
};

export const NoLeadingElement: StoryObj = {
  render: (args) => ({
    props: args,
    template: `
    <mat-selection-list hideSingleSelectionIndicator="true" multiple="false">
      <hra-list-item
        title="{{ item.title }}"
      />
    </mat-selection-list>
`,
  }),
};
