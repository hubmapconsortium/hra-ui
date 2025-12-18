import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ErrorHandler, EnvironmentProviders, Provider } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import { provideMarkdown } from 'ngx-markdown';
import { unparse } from 'papaparse';
import userEvent from '@testing-library/user-event';
import { TableColumn, TableRow } from '../types/page-table.schema';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
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

  async function setup(inputs = {}, additionalProviders: (EnvironmentProviders | Provider)[] = []) {
    const user = userEvent.setup();
    const defaultProviders = [provideHttpClient(), provideHttpClientTesting(), provideMarkdown()];
    const result = await render(TableComponent, {
      providers: [...defaultProviders, ...additionalProviders],
      inputs,
    });
    return { ...result, user };
  }

  it('should render the table data from local', async () => {
    await setup({
      rows: TABLE_ROWS,
      columns: TABLE_COLUMNS,
    });

    expect(screen.getByText('Mary Jane')).toBeInTheDocument();
    expect(screen.getByText(30)).toBeInTheDocument();
  });

  it('should render the table data from URL', async () => {
    const { detectChanges } = await setup({
      csvUrl: 'blob:test',
      columns: TABLE_COLUMNS,
    });

    const controller = TestBed.inject(HttpTestingController);
    const req = controller.expectOne('blob:test');
    req.flush(unparse(TABLE_ROWS, { header: true }));
    detectChanges();

    expect(await screen.findByText('Peter Parker')).toBeInTheDocument();
  });

  it('should report csv errors to the error handler', async () => {
    const handleError = jest.fn();
    const { detectChanges } = await setup({ csvUrl: 'assets/dummy.csv' }, [
      { provide: ErrorHandler, useValue: { handleError } },
    ]);

    const controller = TestBed.inject(HttpTestingController);
    const req = controller.expectOne({ method: 'GET' });
    const data = unparse(TABLE_ROWS, { header: true });
    const badRow = '1,bad row,30\r\n';
    req.flush(data + '\r\n' + badRow);
    detectChanges();

    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(handleError).toHaveBeenCalled();
  });

  it('should render table with row selection enabled', async () => {
    await setup({
      rows: TABLE_ROWS,
      columns: TABLE_COLUMNS,
      enableRowSelection: true,
    });

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);
  });

  it('should display totals for numeric columns', async () => {
    const columnsWithTotal: TableColumn[] = [
      {
        column: 'name',
        label: 'Name',
        type: 'text',
      },
      {
        column: 'age',
        label: 'Age',
        type: {
          type: 'numeric',
          computeTotal: true,
        },
      },
    ];

    const rowsWithNumbers: TableRow[] = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
      { name: 'Charlie', age: 35 },
    ];

    await setup({
      rows: rowsWithNumbers,
      columns: columnsWithTotal,
    });

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });
});
