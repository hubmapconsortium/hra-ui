import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import { provideMarkdown } from 'ngx-markdown';
import { unparse } from 'papaparse';
import { TableColumn, TableRow } from '../types/page-table.schema';
import { TableComponent } from './table.component';
import { ErrorHandler } from '@angular/core';

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

  const providers = [provideHttpClient(), provideHttpClientTesting(), provideMarkdown()];

  it('should render the table data from local', async () => {
    await render(TableComponent, {
      providers,
      inputs: {
        rows: TABLE_ROWS,
        columns: TABLE_COLUMNS,
      },
    });

    expect(screen.getByText('Mary Jane')).toBeInTheDocument();
    expect(screen.getByText(30)).toBeInTheDocument();
  });

  it('should render the table data from URL', async () => {
    const { detectChanges } = await render(TableComponent, {
      providers,
      inputs: {
        csvUrl: 'blob:test',
        columns: TABLE_COLUMNS,
      },
    });
    const controller = TestBed.inject(HttpTestingController);
    const req = controller.expectOne('blob:test');

    req.flush(unparse(TABLE_ROWS, { header: true }));
    detectChanges();

    const el = await screen.findByText('Peter Parker');
    expect(el).toBeInTheDocument();
  });

  it('should report csv errors to the error handler', async () => {
    const handleError = jest.fn();
    const { detectChanges, fixture } = await render(TableComponent, {
      providers: [...providers, { provide: ErrorHandler, useValue: { handleError } }],
      inputs: {
        csvUrl: 'assets/dummy.csv',
      },
    });
    const controller = TestBed.inject(HttpTestingController);
    const req = controller.expectOne({ method: 'GET' });

    const data = unparse(TABLE_ROWS, { header: true });
    const badRow = '1,bad row,30\r\n';
    req.flush(data + '\r\n' + badRow);
    detectChanges();
    await fixture.whenStable();

    expect(handleError).toHaveBeenCalled();
  });
});
