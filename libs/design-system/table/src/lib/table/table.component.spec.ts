import { render, screen } from '@testing-library/angular';
import { TableComponent } from './table.component';
import { TableRow } from '../types/page-table.schema';

describe('Table  Component', () => {
  const TABLE_DATA: TableRow[] = [
    {
      name: 'Test Name',
      value: 100,
    },
  ];
  it('It should render the table data', async () => {
    const { detectChanges } = await render(TableComponent, {
      inputs: {
        rows: TABLE_DATA,
        columns: ['name', 'value'],
      },
    });
    detectChanges();
    expect(screen.getByText('Test Name')).toBeInTheDocument();
    expect(screen.getByText(100)).toBeInTheDocument();
  });
});
