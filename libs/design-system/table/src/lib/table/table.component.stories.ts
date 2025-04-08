import { Meta, StoryObj } from '@storybook/angular';

import { TableComponent, TableRowData } from './table.component';

/** Example data */
const exampleData: TableRowData[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: { label: 'Na', url: 'https://google.com' } },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: { label: 'Mg', url: 'https://google.com' } },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: { label: 'Al', url: 'https://google.com' } },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: { label: 'Si', url: 'https://google.com' } },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: { label: 'P', url: 'https://google.com' } },
  { position: 16, name: 'Sulfur', weight: 32.06, symbol: { label: 'S', url: 'https://google.com' } },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: { label: 'Cl', url: 'https://google.com' } },
  { position: 18, name: 'Argon', weight: 39.948, symbol: { label: 'Ar', url: 'https://google.com' } },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: { label: 'K', url: 'https://google.com' } },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: { label: 'Ca', url: 'https://google.com' } },
];

const meta: Meta<TableComponent> = {
  component: TableComponent,
  title: 'Design System/Table',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=7791-64814&t=doMF8YMctx09RwV7-4',
    },
  },
  args: {
    data: exampleData,
  },
};

export default meta;
type Story = StoryObj<TableComponent>;

export const Alternating: Story = {
  args: {
    style: 'alternating',
  },
};

export const Divider: Story = {
  args: {
    style: 'divider',
  },
};

export const Basic: Story = {
  args: {
    style: 'basic',
  },
};

export const WithScrolling: Story = {
  render: (args) => ({
    props: args,
    styles: [
      `hra-table {
        height: 500px;
      }`,
    ],
  }),
};

export const WithSorting: Story = {
  args: {
    enableSort: true,
  },
};
