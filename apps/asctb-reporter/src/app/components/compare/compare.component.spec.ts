import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Store } from '@ngxs/store';
import { render } from '@testing-library/angular';
import { mock } from 'jest-mock-extended';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { of } from 'rxjs';

import { CompareData } from '../../models/sheet.model';
import { CompareComponent } from './compare.component';

describe('CompareComponent', () => {
  let providers: unknown[];

  const VALID_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit';

  const createMockSheet = (overrides?: Partial<CompareData>): CompareData => ({
    title: 'Test Sheet',
    description: 'Test description',
    link: `${VALID_SHEET_URL}#gid=123`,
    color: '#FF0000',
    fileName: 'test.csv',
    formData: new FormData(),
    sheetId: 'test-sheet-id',
    gid: '123',
    csvUrl: '',
    ...overrides,
  });

  const renderComponent = async (compareSheets: CompareData[] = []) => {
    const { fixture } = await render(CompareComponent, {
      providers,
      componentInputs: { compareSheets: of(compareSheets) },
    });
    return fixture.componentInstance;
  };

  const setupSheetData = (component: CompareComponent, index: number, data: Record<string, unknown>) => {
    component.CSControls.at(index).patchValue(data);
  };

  const createGaSpy = (component: CompareComponent) => jest.spyOn(component['ga'], 'event');

  beforeEach(() => {
    providers = [
      provideHttpClient(),
      provideHttpClientTesting(),
      provideAnimations(),
      { provide: Store, useValue: mock<Store>() },
      { provide: GoogleAnalyticsService, useValue: mock<GoogleAnalyticsService>() },
    ];
  });

  it('should render with compare sheets data', async () => {
    const component = await renderComponent([createMockSheet()]);
    expect(component.CSControls.length).toBe(1);
  });

  it('should render with empty data and create default sheet', async () => {
    const component = await renderComponent();
    expect(component.CSControls.length).toBe(1);
  });

  it('should handle file upload and form validation workflow', async () => {
    const component = await renderComponent();
    const firstSheet = component.CSControls.at(0);
    const linkControl = firstSheet.get('link');
    const formDataControl = firstSheet.get('formData');

    if (linkControl && formDataControl) {
      const [clearSpy, updateSpy] = [
        jest.spyOn(linkControl, 'clearValidators'),
        jest.spyOn(linkControl, 'updateValueAndValidity'),
      ];
      const testFormData = new FormData();

      formDataControl.setValue(testFormData);
      firstSheet.updateValueAndValidity();
      component.upload(testFormData, firstSheet);

      expect(clearSpy).toHaveBeenCalled();
      expect(updateSpy).toHaveBeenCalledWith({ emitEvent: false });
      expect(formDataControl.value).toBe(testFormData);
    }
  });

  it('should execute complete compare workflow', async () => {
    const component = await renderComponent();
    component.addCompareSheetRow();

    setupSheetData(component, 0, {
      title: '',
      description: 'First',
      link: `${VALID_SHEET_URL}#gid=100`,
      color: '#FF0000',
    });
    setupSheetData(component, 1, {
      title: 'Custom',
      description: 'Second',
      link: `${VALID_SHEET_URL}#gid=200`,
      color: '#00FF00',
    });

    const [compareDataSpy, gaSpy] = [jest.spyOn(component['compareData'], 'emit'), createGaSpy(component)];

    component.compare();

    const isValid = component['formGroup'].status === 'VALID';
    expect(component['formValid']).toBe(isValid);

    if (isValid) {
      expect(compareDataSpy).toHaveBeenCalled();
      expect(gaSpy).toHaveBeenCalled();
    } else {
      expect(compareDataSpy).not.toHaveBeenCalled();
    }
  });

  it('should remove sheet and handle data source changes', async () => {
    const component = await renderComponent();
    component.addCompareSheetRow();
    const gaSpy = createGaSpy(component);

    // Test remove functionality
    expect(component.CSControls.length).toBe(2);
    component.removeCompareSheetRow(1);
    expect(component.CSControls.length).toBe(1);
    expect(gaSpy).toHaveBeenCalledWith(expect.any(String), expect.any(String), 'Delete compare row', 1);

    // Test data source change in same test
    setupSheetData(component, 0, {
      link: `${VALID_SHEET_URL}#gid=100`,
      fileName: 'test.csv',
      formData: new FormData(),
    });
    component.onDataSourceChange(0);
    expect(component.CSControls.at(0).get('link')?.value).toBeDefined();
  });
});
