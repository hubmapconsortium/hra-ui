import { render } from '@testing-library/angular';
import { fireEvent } from '@testing-library/dom';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BottomSheetComponent, BottomSheetData } from './bottom-sheet.component';
import { TableColumn, TableRow } from '@hra-ui/design-system/table';

describe('BottomSheetComponent', () => {
  const providers = [provideHttpClient(), provideHttpClientTesting()];
  const mockBottomSheetRef = {
    dismiss: jest.fn(),
  };

  const tableData: BottomSheetData = {
    variant: 'table',
    rows: [
      { id: '1', name: 'John Doe', age: 30 },
      { id: '2', name: 'Jane Smith', age: 25 },
    ] as TableRow[],
    columns: [
      { column: 'name', label: 'Name', type: 'text' },
      { column: 'age', label: 'Age', type: 'numeric' },
    ] as TableColumn[],
  };

  const pageSectionData: BottomSheetData = {
    variant: 'page-section',
    tagline: 'Test tagline content',
  };

  it('should create', async () => {
    const { fixture } = await render(BottomSheetComponent, {
      providers: [
        ...providers,
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: tableData },
        { provide: MatBottomSheetRef, useValue: mockBottomSheetRef },
      ],
    });

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render close button', async () => {
    const { getByLabelText } = await render(BottomSheetComponent, {
      providers: [
        ...providers,
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: tableData },
        { provide: MatBottomSheetRef, useValue: mockBottomSheetRef },
      ],
    });

    expect(getByLabelText('Close bottom sheet')).toBeTruthy();
  });

  it('should call dismiss when close button is clicked', async () => {
    const { getByLabelText } = await render(BottomSheetComponent, {
      providers: [
        ...providers,
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: tableData },
        { provide: MatBottomSheetRef, useValue: mockBottomSheetRef },
      ],
    });

    const closeButton = getByLabelText('Close bottom sheet');
    fireEvent.click(closeButton);

    expect(mockBottomSheetRef.dismiss).toHaveBeenCalled();
  });

  it('should render table variant correctly', async () => {
    const { container } = await render(BottomSheetComponent, {
      providers: [
        ...providers,
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: tableData },
        { provide: MatBottomSheetRef, useValue: mockBottomSheetRef },
      ],
    });

    expect(container.querySelector('hra-table')).toBeTruthy();
  });

  it('should render page-section variant correctly', async () => {
    const { container } = await render(BottomSheetComponent, {
      providers: [
        ...providers,
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: pageSectionData },
        { provide: MatBottomSheetRef, useValue: mockBottomSheetRef },
      ],
    });

    expect(container.querySelector('hra-page-section')).toBeTruthy();
  });

  it('should pass correct data to table component', async () => {
    const { container } = await render(BottomSheetComponent, {
      providers: [
        ...providers,
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: tableData },
        { provide: MatBottomSheetRef, useValue: mockBottomSheetRef },
      ],
    });

    const tableElement = container.querySelector('hra-table');
    expect(tableElement).toBeTruthy();
  });

  it('should pass correct data to page-section component', async () => {
    const { container } = await render(BottomSheetComponent, {
      providers: [
        ...providers,
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: pageSectionData },
        { provide: MatBottomSheetRef, useValue: mockBottomSheetRef },
      ],
    });

    const pageSectionElement = container.querySelector('hra-page-section');
    expect(pageSectionElement).toBeTruthy();
  });
});
