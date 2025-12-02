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

  it('should toggle all rows selection', async () => {
    const { fixture } = await render(TableComponent, {
      providers,
      inputs: {
        rows: TABLE_ROWS,
        columns: TABLE_COLUMNS,
        enableRowSelection: true,
      },
    });

    const component = fixture.componentInstance;
    expect(component.selection.selected.length).toBe(0);

    component.toggleAllRows();
    expect(component.isAllSelected()).toBe(true);
    expect(component.selection.selected.length).toBe(TABLE_ROWS.length);

    component.toggleAllRows();
    expect(component.selection.selected.length).toBe(0);
  });

  it('should toggle individual row selection', async () => {
    const { fixture } = await render(TableComponent, {
      providers,
      inputs: {
        rows: TABLE_ROWS,
        columns: TABLE_COLUMNS,
        enableRowSelection: true,
      },
    });

    const component = fixture.componentInstance;
    const row = TABLE_ROWS[0];

    component.toggleRow(row);
    expect(component.selection.isSelected(row)).toBe(true);

    component.toggleRow(row);
    expect(component.selection.isSelected(row)).toBe(false);
  });

  it('should emit selectionChange when toggling rows', async () => {
    const { fixture } = await render(TableComponent, {
      providers,
      inputs: {
        rows: TABLE_ROWS,
        columns: TABLE_COLUMNS,
        enableRowSelection: true,
      },
    });

    const component = fixture.componentInstance;
    const selectionChangeSpy = jest.fn();
    component.selectionChange.subscribe(selectionChangeSpy);

    component.toggleAllRows();
    expect(selectionChangeSpy).toHaveBeenCalledWith(TABLE_ROWS);

    component.toggleRow(TABLE_ROWS[0]);
    expect(selectionChangeSpy).toHaveBeenCalledTimes(2);
  });

  it('should return menu options as array', async () => {
    const { fixture } = await render(TableComponent, {
      providers,
      inputs: {
        rows: TABLE_ROWS,
        columns: TABLE_COLUMNS,
      },
    });

    const component = fixture.componentInstance;
    const menuOptions = [
      { id: '1', name: 'Option 1', icon: 'icon1' },
      { id: '2', name: 'Option 2', icon: 'icon2' },
    ];

    const result = component.getMenuOptions(menuOptions);
    expect(result).toEqual(menuOptions);
  });

  it('should emit route when routeClick is called', async () => {
    const { fixture } = await render(TableComponent, {
      providers,
      inputs: {
        rows: TABLE_ROWS,
        columns: TABLE_COLUMNS,
      },
    });

    const component = fixture.componentInstance;
    const routeClickedSpy = jest.fn();
    component.routeClicked.subscribe(routeClickedSpy);

    const testUrl = '/test/route';
    component.routeClick(testUrl);
    expect(routeClickedSpy).toHaveBeenCalledWith(testUrl);
  });

  it('should emit id when download button is hovered', async () => {
    const { fixture } = await render(TableComponent, {
      providers,
      inputs: {
        rows: TABLE_ROWS,
        columns: TABLE_COLUMNS,
      },
    });

    const component = fixture.componentInstance;
    const downloadHoveredSpy = jest.fn();
    component.downloadHovered.subscribe(downloadHoveredSpy);

    const testId = 'test-id-123';
    component.downloadButtonHover(testId);
    expect(downloadHoveredSpy).toHaveBeenCalledWith(testId);
  });

  it('should call download method with url', async () => {
    const { fixture } = await render(TableComponent, {
      providers,
      inputs: {
        rows: TABLE_ROWS,
        columns: TABLE_COLUMNS,
      },
    });

    const component = fixture.componentInstance;
    const testUrl = 'https://example.com/files/test-file.csv';

    // Test that the download method can be called without errors
    expect(() => component.download(testUrl)).not.toThrow();
  });

  it('should scroll to top of table', async () => {
    const { fixture } = await render(TableComponent, {
      providers,
      inputs: {
        rows: TABLE_ROWS,
        columns: TABLE_COLUMNS,
      },
    });

    const component = fixture.componentInstance;
    fixture.detectChanges();

    const scrollToSpy = jest.spyOn(component.scrollbar(), 'scrollTo');
    component.scrollToTop();
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, duration: 0 });
  });

  it('should compute totals for numeric columns with computeTotal enabled', async () => {
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
      {
        column: 'score',
        label: 'Score',
        type: {
          type: 'numeric',
          computeTotal: true,
        },
      },
    ];

    const rowsWithNumbers: TableRow[] = [
      { name: 'Alice', age: 30, score: 85 },
      { name: 'Bob', age: 25, score: 90 },
      { name: 'Charlie', age: 35, score: 95 },
    ];

    const { fixture } = await render(TableComponent, {
      providers,
      inputs: {
        rows: rowsWithNumbers,
        columns: columnsWithTotal,
      },
    });

    const component = fixture.componentInstance;
    const totals = component['totals']();

    const ageColumn = columnsWithTotal[1];
    const scoreColumn = columnsWithTotal[2];

    expect(totals.get(ageColumn)).toBe(90); // 30 + 25 + 35
    expect(totals.get(scoreColumn)).toBe(270); // 85 + 90 + 95
  });
});
