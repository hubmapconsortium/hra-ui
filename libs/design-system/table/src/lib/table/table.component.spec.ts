import { render, screen } from '@testing-library/angular';
import { TableComponent, TableRowData } from './table.component';

describe('Table  Component', () => {
  const TABLE_DATA: TableRowData[] = [
    {
      name: 'Test Name',
      value: 100,
    },
  ];
  it('It should render the table data', async () => {
    const { detectChanges } = await render(TableComponent, {
      inputs: {
        data: TABLE_DATA,
        columns: ['name', 'value'],
      },
    });
    detectChanges();
    expect(screen.getByText('Test Name')).toBeInTheDocument();
    expect(screen.getByText(100)).toBeInTheDocument();
  });
});
