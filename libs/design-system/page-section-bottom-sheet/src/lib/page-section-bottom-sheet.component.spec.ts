import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { render } from '@testing-library/angular';
import { PageSectionBottomSheetComponent } from './page-section-bottom-sheet.component';

describe('PageSectionBottomSheetComponent', () => {
  const mockDataSingle = {
    variant: 'page-section' as const,
    tagline: 'Test Tagline',
    content: 'Test content for the page section',
  };

  const mockDataMultiple = {
    variant: 'page-sections' as const,
    sections: [
      { tagline: 'Section 1', content: 'Content 1' },
      { tagline: 'Section 2', content: 'Content 2' },
    ],
  };

  const mockBottomSheetRef = {
    dismiss: jest.fn(),
  };

  it('should create with single page section data', async () => {
    const { fixture } = await render(PageSectionBottomSheetComponent, {
      providers: [
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: mockDataSingle },
        { provide: MatBottomSheetRef, useValue: mockBottomSheetRef },
      ],
    });

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should create with multiple page sections data', async () => {
    const { fixture } = await render(PageSectionBottomSheetComponent, {
      providers: [
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: mockDataMultiple },
        { provide: MatBottomSheetRef, useValue: mockBottomSheetRef },
      ],
    });

    expect(fixture.componentInstance).toBeTruthy();
  });
});
