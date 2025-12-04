import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { of } from 'rxjs';
import { SheetInfo } from '../../models/sheet.model';
import { InfoComponent } from './info.component';

describe('InfoComponent', () => {
  let component: InfoComponent;
  let fixture: ComponentFixture<InfoComponent>;
  let mockBottomSheetRef: Partial<MatBottomSheetRef>;

  const mockSheetInfo: SheetInfo = {
    hasError: false,
    name: 'Test Sheet',
    title: 'Test Title',
    description: 'Test Description',
    version: '1.0',
  } as unknown as SheetInfo;

  const mockSheetInfoWithError: SheetInfo = {
    hasError: true,
    msg: 'Test error message',
    status: 404,
  } as SheetInfo;

  const createComponent = async (sheetData: SheetInfo) => {
    await TestBed.configureTestingModule({
      imports: [InfoComponent],
      providers: [
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: of(sheetData) },
        { provide: MatBottomSheetRef, useValue: mockBottomSheetRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoComponent);
    component = fixture.componentInstance;
  };

  beforeEach(() => {
    mockBottomSheetRef = { dismiss: jest.fn() };
  });

  describe('with successful sheet info', () => {
    beforeEach(() => createComponent(mockSheetInfo));

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with loading state', () => {
      expect(component.loading).toBe(true);
      expect(component.error.hasError).toBe(false);
    });

    it('should load sheet info successfully and set error state to false', () => {
      component.ngOnInit();

      expect(component.loading).toBe(false);
      expect(component.info).toEqual(mockSheetInfo);
      expect(component.error).toEqual({ hasError: false });
    });

    it('should close bottom sheet and track analytics', () => {
      component.close();

      expect(mockBottomSheetRef.dismiss).toHaveBeenCalled();
    });
  });

  describe('with error sheet info', () => {
    beforeEach(() => createComponent(mockSheetInfoWithError));

    it('should handle sheet info with error', () => {
      component.ngOnInit();

      expect(component.loading).toBe(false);
      expect(component.error.hasError).toBe(true);
      expect(component.error.msg).toBe('Test error message');
      expect(component.error.status).toBe(404);
    });
  });
});
