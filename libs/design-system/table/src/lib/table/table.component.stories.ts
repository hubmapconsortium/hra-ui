import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { provideMarkdown } from 'ngx-markdown';
import { TableColumn, TableRow } from '../types/page-table.schema';
import { TableComponent } from './table.component';
import { unparse } from 'papaparse';

const columns: TableColumn[] = [
  {
    column: 'position',
    label: 'Position',
    type: 'text',
  },
  {
    column: 'name',
    label: 'Name',
    type: 'markdown',
  },
  {
    column: 'weight',
    label: 'Weight',
    type: 'numeric',
  },
  {
    column: 'symbol',
    label: 'Symbol',
    type: {
      type: 'link',
      urlColumn: 'symbolUrl',
    },
  },
];

const symbolUrl = 'https://google.com';

/** Example data */
const rows: TableRow[] = [
  { position: 1, name: '**Hydrogen**', weight: 1.0079, symbol: 'H', symbolUrl },
  { position: 2, name: '**Helium**', weight: 4.0026, symbol: 'He', symbolUrl },
  { position: 3, name: '**Lithium**', weight: 6.941, symbol: 'Li', symbolUrl },
  { position: 4, name: '**Beryllium**', weight: 9.0122, symbol: 'Be', symbolUrl },
  { position: 5, name: '**Boron**', weight: 10.811, symbol: 'B', symbolUrl },
  { position: 6, name: '**Carbon**', weight: 12.0107, symbol: 'C', symbolUrl },
  { position: 7, name: '**Nitrogen**', weight: 14.0067, symbol: 'N', symbolUrl },
  { position: 8, name: '**Oxygen**', weight: 15.9994, symbol: 'O', symbolUrl },
  { position: 9, name: '**Fluorine**', weight: 18.9984, symbol: 'F', symbolUrl },
  { position: 10, name: '**Neon**', weight: 20.1797, symbol: 'Ne', symbolUrl },
  { position: 11, name: '**Sodium**', weight: 22.9897, symbol: 'Na', symbolUrl },
  { position: 12, name: '**Magnesium**', weight: 24.305, symbol: 'Mg', symbolUrl },
  { position: 13, name: '**Aluminum**', weight: 26.9815, symbol: 'Al', symbolUrl },
  { position: 14, name: '**Silicon**', weight: 28.0855, symbol: 'Si', symbolUrl },
  { position: 15, name: '**Phosphorus**', weight: 30.9738, symbol: 'P', symbolUrl },
  { position: 16, name: '**Sulfur**', weight: 32.06, symbol: 'S', symbolUrl },
  { position: 17, name: '**Chlorine**', weight: 35.453, symbol: 'Cl', symbolUrl },
  { position: 18, name: '**Argon**', weight: 39.948, symbol: 'Ar', symbolUrl },
  { position: 19, name: '**Potassium**', weight: 39.0983, symbol: 'K', symbolUrl },
  { position: 20, name: '**Calcium**', weight: 40.078, symbol: 'Ca', symbolUrl },
];

const csvContent = unparse(rows, { header: true });
const csvUrl = URL.createObjectURL(new Blob([csvContent], { type: 'text/csv' }));

const meta: Meta<TableComponent> = {
  component: TableComponent,
  title: 'Design System/Table',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=7791-64814&t=doMF8YMctx09RwV7-4',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideMarkdown()],
    }),
  ],
  args: {
    enableSort: true,
    verticalDividers: false,
    columns,
    rows,
  },
  argTypes: {
    style: {
      control: 'select',
      options: ['alternating', 'divider', 'basic'],
    },
    enableSort: {
      control: 'boolean',
    },
    verticalDividers: {
      control: 'boolean',
    },
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

export const WithSelection: Story = {
  args: {
    style: 'alternating',
    enableSelection: true,
  },
};

export const WithScrolling: Story = {
  render: (args) => ({
    props: args,
    styles: [
      `hra-table {
        height: 35rem;
      }`,
    ],
  }),
};

export const WithCsvUrl: Story = {
  args: {
    rows: undefined,
    csvUrl,
  },
};
