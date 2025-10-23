import { MatListModule } from '@angular/material/list';
import { Densities, DensityDirective } from '@hra-ui/design-system/density';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

const Items = [
  { title: 'List Item 1', line2: 'Secondary text 1', line3: 'Tertiary text 1' },
  { title: 'List Item 2', line2: 'Secondary text 2', line3: 'Tertiary text 2' },
  { title: 'List Item 3', line2: 'Secondary text 3', line3: 'Tertiary text 3' },
  { title: 'List Item 4', line2: 'Secondary text 4', line3: 'Tertiary text 4' },
  { title: 'List Item 5', line2: 'Secondary text 5', line3: 'Tertiary text 5' },
];

const meta: Meta = {
  title: 'Design System/Selection List/List',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=4923-35928',
    },
  },
  decorators: [
    moduleMetadata({
      imports: [MatListModule, DensityDirective],
    }),
  ],
  args: {
    items: Items,
    density: Densities.Compact0,
  },
  argTypes: {
    density: {
      control: { type: 'select' },
      options: Object.keys(Densities),
      mapping: Densities,
    },
  },
};
export default meta;

export const SingleSelection: StoryObj = {
  render: (args) => ({
    props: args,
    template: `
    <mat-selection-list multiple="false" hraDensity="{{ density }}">
      @for (item of items; track item.title) {
        <mat-list-option togglePosition="before">
          <span matListItemTitle>{{ item.title }}</span>
        </mat-list-option>
      }
    </mat-selection-list>
`,
  }),
};

export const MultipleSelection: StoryObj = {
  render: (args) => ({
    props: args,
    template: `
    <mat-selection-list hraDensity="{{ density }}">
      @for (item of items; track item.title) {
        <mat-list-option togglePosition="before">
          <span matListItemTitle>{{ item.title }}</span>
        </mat-list-option>
      }
    </mat-selection-list>
`,
  }),
};

export const NoLeadingElement: StoryObj = {
  render: (args) => ({
    props: args,
    template: `
    <mat-selection-list hideSingleSelectionIndicator="true" multiple="false" hraDensity="{{ density }}">
     @for (item of items; track item.title) {
        <mat-list-option togglePosition="before">
          <span matListItemTitle>{{ item.title }}</span>
        </mat-list-option>
      }
    </mat-selection-list>
`,
  }),
};

export const WithTwoLines: StoryObj = {
  render: (args) => ({
    props: args,
    template: `
    <mat-selection-list hraDensity="{{ density }}">
     @for (item of items; track item.title) {
        <mat-list-option togglePosition="before">
          <span matListItemTitle>{{ item.title }}</span>
          <span matListItemLine>{{ item.line2 }}</span>
        </mat-list-option>
      }
    </mat-selection-list>
`,
  }),
};

export const WithThreeLines: StoryObj = {
  render: (args) => ({
    props: args,
    template: `
    <mat-selection-list hraDensity="{{ density }}">
     @for (item of items; track item.title) {
        <mat-list-option togglePosition="before">
          <span matListItemTitle>{{ item.title }}</span>
          <span matListItemLine>{{ item.line2 }}</span>
          <span matListItemLine>{{ item.line3 }}</span>
        </mat-list-option>
      }
    </mat-selection-list>
`,
  }),
};
