import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { render } from '@testing-library/angular';
import { TableBottomSheetComponent } from './table-bottom-sheet.component';

describe('TableBottomSheetComponent', () => {
  const mockData = {
    rows: [
      { property: 'Name', value: 'John Doe' },
      { property: 'Age', value: '30' },
    ],
    columns: [
      { column: 'property', label: 'Property', type: 'text' as const },
      { column: 'value', label: 'Value', type: 'text' as const },
    ],
    hideHeaders: false,
  };

  const mockBottomSheetRef = {
    dismiss: jest.fn(),
  };

  it('should create', async () => {
    const { fixture } = await render(TableBottomSheetComponent, {
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: mockData },
        { provide: MatBottomSheetRef, useValue: mockBottomSheetRef },
      ],
    });

    expect(fixture.componentInstance).toBeTruthy();
  });
});
