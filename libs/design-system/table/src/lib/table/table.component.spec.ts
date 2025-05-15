import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import { provideMarkdown } from 'ngx-markdown';
import { unparse } from 'papaparse';
import { TableColumn, TableRow } from '../types/page-table.schema';
import { TableComponent } from './table.component';

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

  it('should render the table data from local', async () => {
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

  it('should render the table data from URL', async () => {
    const { detectChanges } = await render(TableComponent, {
      inputs: {
        csvUrl: 'blob:test',
        columns: TABLE_COLUMNS,
      },
      providers: [provideHttpClient(), provideHttpClientTesting(), provideMarkdown()],
    });
    const controller = TestBed.inject(HttpTestingController);
    const req = controller.expectOne('blob:test');

    req.flush(unparse(TABLE_ROWS, { header: true }));
    detectChanges();

    const el = await screen.findByText('Peter Parker');
    expect(el).toBeInTheDocument();
  });
});
