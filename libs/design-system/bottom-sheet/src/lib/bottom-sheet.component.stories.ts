import { Component, computed, inject, input } from '@angular/core';
import { type Meta, type StoryObj } from '@storybook/angular';
import { TableColumn, TableRow } from '@hra-ui/design-system/table';
import { BottomSheetService, PageSectionData } from '../';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'hra-bottom-sheet-demo',
  standalone: true,
  imports: [MatButtonModule],
  template: ` <button mat-flat-button (click)="openBottomSheet()">Open {{ buttonLabel() }} Bottom Sheet</button> `,
})
class BottomSheetDemoComponent {
  readonly variant = input.required<'table' | 'page-section' | 'page-sections'>();
  readonly tagline = input<string>('');
  readonly content = input<string>('');
  readonly rows = input<TableRow[]>([]);
  readonly columns = input<TableColumn[]>([]);
  readonly sections = input<PageSectionData[]>([]);

  private readonly service = inject(BottomSheetService);

  protected readonly buttonLabel = computed(() => {
    switch (this.variant()) {
      case 'table':
        return 'Table';
      case 'page-section':
        return 'Page Section';
      case 'page-sections':
        return 'Multiple Page Sections';
      default:
        return 'Bottom Sheet';
    }
  });

  openBottomSheet() {
    switch (this.variant()) {
      case 'table':
        this.service.openTableBottomSheet(this.rows(), this.columns());
        break;
      case 'page-section':
        this.service.openPageSectionBottomSheet(this.tagline(), this.content());
        break;
      case 'page-sections':
        this.service.openMultiplePageSectionsBottomSheet(this.sections());
        break;
    }
  }
}

const meta: Meta<BottomSheetDemoComponent> = {
  component: BottomSheetDemoComponent,
  title: 'Design System/Bottom Sheet',
  argTypes: {
    variant: {
      control: 'select',
      options: ['table', 'page-section', 'page-sections'],
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
      description: 'Tagline text (for single page section bottom sheets)',
    },
    content: {
      control: 'text',
      if: { arg: 'variant', eq: 'page-section' },
      description: 'Content text (for single page section bottom sheets)',
    },
    sections: {
      control: 'object',
      if: { arg: 'variant', eq: 'page-sections' },
      description: 'Array of page sections (for multiple page sections bottom sheets)',
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
    content:
      'This is additional content for the page section. It provides more detailed information about the section.',
  },
};

export const MultiplePageSectionsBottomSheet: Story = {
  args: {
    variant: 'page-sections',
    sections: [
      {
        tagline: 'Section label in sentence case',
        content:
          'We should try to keep text short and sweet in sections. Users can copy text out of bottom sheets for easy access. Text hyperlinks may also be found if there are routes in the data. External routes outside of the HRA always open in new tabs.',
      },
      {
        tagline: 'Section label in sentence case',
        content: 'This is placeholder text. We should try to keep this short in these sections',
      },
      {
        tagline: 'Section label in sentence case',
        content:
          'We should try to keep text short and sweet in sections. Users can copy this text out of here for easy access. Text hyperlinks may also be found if there are routes in the data.',
      },
      {
        tagline: 'Section label in sentence case',
        content: 'This is placeholder text. We should try to keep this short in these sections',
      },
      {
        tagline: 'Section label in sentence case',
        content: 'This is placeholder text. We should try to keep this short in these sections',
      },
      {
        tagline: 'Section label in sentence case',
        content:
          'We should try to keep text short and sweet in sections. Users can copy text out of bottom sheets for easy access. Text hyperlinks may also be found if there are routes in the data. External routes outside of the HRA always open in new tabs.',
      },
      {
        tagline: 'Section label in sentence case',
        content: 'This is placeholder text. We should try to keep this short in these sections',
      },
      {
        tagline: 'Section label in sentence case',
        content:
          'We should try to keep text short and sweet in sections. Users can copy this text out of here for easy access. Text hyperlinks may also be found if there are routes in the data.',
      },
      {
        tagline: 'Section label in sentence case',
        content: 'This is placeholder text. We should try to keep this short in these sections',
      },
      {
        tagline: 'Section label in sentence case',
        content: 'This is placeholder text. We should try to keep this short in these sections',
      },
    ],
  },
};
