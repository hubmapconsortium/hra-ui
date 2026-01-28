import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { provideMarkdown } from 'ngx-markdown';
import { of } from 'rxjs';
import { SheetInfo } from '../../models/sheet.model';
import { InfoComponent } from './info.component';

describe('InfoComponent', () => {
  let mockBottomSheetRef: Partial<MatBottomSheetRef>;

  const mockSheetInfo: SheetInfo = {
    hasError: false,
    name: 'Test Sheet',
    title: 'Test Title',
    desc: 'Test Description',
    version: '1.0',
  } as unknown as SheetInfo;

  const mockSheetInfoWithError: SheetInfo = {
    hasError: true,
    msg: 'Test error message',
    status: 404,
  } as SheetInfo;

  beforeEach(() => {
    mockBottomSheetRef = { dismiss: jest.fn() };
  });

  describe('with successful sheet info', () => {
    it('renders sheet info and allows closing', async () => {
      await render(InfoComponent, {
        providers: [
          { provide: MAT_BOTTOM_SHEET_DATA, useValue: of(mockSheetInfo) },
          { provide: MatBottomSheetRef, useValue: mockBottomSheetRef },
          provideMarkdown(),
        ],
      });

      expect(await screen.findByText('Test Sheet')).toBeTruthy();
      expect(screen.queryByText(/Could not fetch data/i)).toBeNull();

      const closeBtn = screen.getByText('close').closest('button');
      await userEvent.click(closeBtn as Element);
      expect(mockBottomSheetRef.dismiss).toHaveBeenCalled();
    });
  });

  describe('with error sheet info', () => {
    it('shows error information when sheet info has an error', async () => {
      await render(InfoComponent, {
        providers: [
          { provide: MAT_BOTTOM_SHEET_DATA, useValue: of(mockSheetInfoWithError) },
          { provide: MatBottomSheetRef, useValue: mockBottomSheetRef },
          provideMarkdown(),
        ],
      });

      expect(await screen.findByText(/Could not fetch data/i)).toBeTruthy();
      // error details may be displayed depending on the payload
      expect(screen.queryByText('Test error message')).toBeNull();
    });
  });
});
