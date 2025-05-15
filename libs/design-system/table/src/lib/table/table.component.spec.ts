import { render, screen } from '@testing-library/angular';
import { TableComponent } from './table.component';
import { TableColumn, TableRow } from '../types/page-table.schema';
import { provideHttpClient } from '@angular/common/http';
import { provideMarkdown } from 'ngx-markdown';

describe('Table  Component', () => {
  const TABLE_COLUMNS: TableColumn[] = [
    {
      column: 'serial_no',
      label: '#',
      type: 'text',
    },
    {
      column: 'name',
      label: 'Name',
      type: 'markdown',
    },
    {
      column: 'age',
      label: 'Age',
      type: 'numeric',
    },
    {
      column: 'download',
      label: 'Download Data',
      type: {
        type: 'link',
        urlColumn: 'dataUrl',
      },
    },
  ];
  const TABLE_ROWS: TableRow[] = [
    { serial_no: 1, name: '**Peter Parker**', age: 30, download: 'https://example.com' },
    { serial_no: 2, name: '**Mary Jane**', age: 28, download: 'https://example.com' },
  ];
  it('It should render the table data', async () => {
    await render(TableComponent, {
      inputs: {
        rows: TABLE_ROWS,
        columns: TABLE_COLUMNS,
      },
      providers: [provideHttpClient(), provideMarkdown()],
    });
    expect(screen.getByText('Mary Jane')).toBeInTheDocument();
    expect(screen.getByText(30)).toBeInTheDocument();
  });
});
