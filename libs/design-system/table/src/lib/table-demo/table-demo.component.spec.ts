import { render, screen } from '@testing-library/angular';
import { TableDemoComponent, TableDemoData } from './table-demo.component';

describe('Table Demo Component', () => {
  const TABLE_DATA: TableDemoData[] = [
    {
      name: 'Test Name',
      value: 100,
    },
  ];
  it('It should render the table data', async () => {
    const { detectChanges } = await render(TableDemoComponent, {
      inputs: {
        data: TABLE_DATA,
      },
    });
    detectChanges();
    expect(screen.getByText('Test Name')).toBeInTheDocument();
    expect(screen.getByText(100)).toBeInTheDocument();
  });
});
