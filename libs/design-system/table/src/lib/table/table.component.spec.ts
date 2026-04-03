import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ErrorHandler, EnvironmentProviders, Provider } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { render, screen } from '@testing-library/angular';
import { provideMarkdown } from 'ngx-markdown';
import { unparse } from 'papaparse';
import userEvent from '@testing-library/user-event';
import saveAs from 'file-saver';
import { TableColumn, TableRow } from '../types/page-table.schema';
import { TableComponent } from './table.component';

jest.mock('file-saver', () => jest.fn());

describe('TableComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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

  it('should infer columns when columns input is not provided', async () => {
    await setup({
      rows: [
        { label: 'Alpha', count: 2 },
        { label: 'Beta', count: 5 },
      ],
    });

    expect(screen.getByText('label')).toBeInTheDocument();
    expect(screen.getByText('count')).toBeInTheDocument();
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should toggle all rows from the header checkbox and emit selection', async () => {
    const { fixture, user } = await setup({
      rows: TABLE_ROWS,
      columns: TABLE_COLUMNS,
      enableRowSelection: true,
    });

    const selectionChangeSpy = jest.fn();
    fixture.componentInstance.selectionChange.subscribe(selectionChangeSpy);

    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]);

    expect(selectionChangeSpy).toHaveBeenCalled();
    const latestSelection = selectionChangeSpy.mock.calls.at(-1)?.[0] as TableRow[];
    expect(latestSelection).toHaveLength(TABLE_ROWS.length);
  });

  it('should toggle a single row selection and emit selected row', async () => {
    const { fixture, user } = await setup({
      rows: TABLE_ROWS,
      columns: TABLE_COLUMNS,
      enableRowSelection: true,
    });

    const selectionChangeSpy = jest.fn();
    fixture.componentInstance.selectionChange.subscribe(selectionChangeSpy);

    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[1]);

    expect(selectionChangeSpy).toHaveBeenCalled();
    const latestSelection = selectionChangeSpy.mock.calls.at(-1)?.[0] as TableRow[];
    expect(latestSelection).toEqual([TABLE_ROWS[0]]);
  });

  it('should emit routeClicked for internal links', async () => {
    const routeColumns: TableColumn[] = [
      {
        column: 'name',
        label: 'Name',
        type: {
          type: 'link',
          urlColumn: 'route',
          internal: true,
        },
      },
    ];
    const routeRows: TableRow[] = [{ name: 'Open Details', route: '/details/42' }];

    const { fixture, user } = await setup({ rows: routeRows, columns: routeColumns });
    const routeClickSpy = jest.fn();
    fixture.componentInstance.routeClicked.subscribe(routeClickSpy);

    await user.click(screen.getByText('Open Details'));

    expect(routeClickSpy).toHaveBeenCalledWith('/details/42');
  });

  it('should emit downloadHovered when menu button is hovered', async () => {
    const menuColumns: TableColumn[] = [
      {
        column: 'downloads',
        label: 'Downloads',
        type: {
          type: 'menu',
          icon: 'download',
          options: 'downloadOptions',
          tooltip: 'Download files',
        },
      },
    ];
    const menuRows: TableRow[] = [
      {
        id: 'row-1',
        downloads: 'Open menu',
        downloadOptions: [{ id: 'opt-1', name: 'CSV', icon: 'download', url: 'https://example.com/data.csv' }],
      },
    ];

    const { fixture, user } = await setup({ rows: menuRows, columns: menuColumns });
    const hoverSpy = jest.fn();
    fixture.componentInstance.downloadHovered.subscribe(hoverSpy);

    const menuButton = screen.getAllByRole('button')[0];
    await user.hover(menuButton);

    expect(hoverSpy).toHaveBeenCalledWith('row-1');
  });

  it('should download file with filename parsed from url', async () => {
    const { fixture } = await setup({ rows: TABLE_ROWS, columns: TABLE_COLUMNS });

    fixture.componentInstance.download('https://example.com/reports/export.csv');

    expect(saveAs).toHaveBeenCalledWith('https://example.com/reports/export.csv', 'export.csv');
  });

  it('should open data exploration preview dialog with title and image url', async () => {
    const open = jest.fn();
    const close = jest.fn();
    open.mockReturnValue({ close });

    const explorationColumns: TableColumn[] = [
      {
        column: 'exploreUrl',
        label: 'Explore',
        type: {
          type: 'dataExploration',
          titleColumn: 'title',
          imageUrlColumn: 'preview',
          icon: 'preview',
        },
      },
    ];
    const explorationRows: TableRow[] = [
      {
        exploreUrl: 'https://example.com/explore/1',
        title: 'Sample Dataset',
        preview: 'https://example.com/image.png',
      },
    ];

    const { user } = await setup({ rows: explorationRows, columns: explorationColumns }, [
      { provide: MatDialog, useValue: { open } },
    ]);

    await user.click(screen.getByRole('button', { name: 'Preview Sample Dataset' }));

    expect(open).toHaveBeenCalled();
    const [, config] = open.mock.calls[0];
    expect(config.data.title).toBe('Sample Dataset');
    expect(config.data.url).toBe('https://example.com/image.png');
  });
});
