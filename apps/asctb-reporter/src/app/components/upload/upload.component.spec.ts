import { render, RenderResult } from '@testing-library/angular';
import { FormControl, FormGroup } from '@angular/forms';
import { UploadComponent } from './upload.component';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: RenderResult<UploadComponent>['fixture'];

  beforeEach(async () => {
    const renderResult: RenderResult<UploadComponent> = await render(UploadComponent);
    component = renderResult.fixture.componentInstance;
    fixture = renderResult.fixture;
  });

  it('should create and initialize form', () => {
    expect(component).toBeTruthy();
    expect(component.formGroup).toBeDefined();
    expect(component.formGroup.get('link')).toBeDefined();
    expect(component.formGroup.get('formData')).toBeDefined();
    expect(component.formGroup.get('fileName')).toBeDefined();
  });

  it('should handle form validation and submission', () => {
    const spy = jest.spyOn(component.uploadForm, 'emit');

    // Test invalid submission - form should be invalid initially
    component.submitData();
    expect(spy).not.toHaveBeenCalled();

    // Test valid submission with Google Sheets link
    component.formGroup.patchValue({
      link: 'https://docs.google.com/spreadsheets/d/test123456789012345/edit#gid=123',
    });
    fixture.detectChanges();

    component.submitData();
    expect(spy).toHaveBeenCalledWith({
      link: 'https://docs.google.com/spreadsheets/d/test123456789012345/edit#gid=123',
      formData: '',
      fileName: '',
      sheetId: 'test123456789012345',
      gid: '123',
      csvUrl: '',
    });
  });

  it('should handle file upload and form changes', () => {
    const mockFormData = new FormData();
    component.upload(mockFormData);
    expect(component.formGroup.get('formData')?.value).toBe(mockFormData);

    // Test fileName makes form valid
    component.formGroup.patchValue({ fileName: 'test.csv' });
    fixture.detectChanges();
    expect(component.formValid).toBeTruthy();
  });

  it('should parse different URL formats', () => {
    // Google Sheets URL with 7 parts
    expect(component.checkLinkFormat('https://docs.google.com/spreadsheets/d/abc123/edit#gid=456')).toEqual({
      sheetID: 'abc123',
      gid: '456',
      csvUrl: '',
    });

    // Test with a URL that uses default fallback behavior
    expect(component.checkLinkFormat('https://example.com/data.csv')).toEqual({
      sheetID: '0',
      gid: '0',
      csvUrl: 'https://example.com/data.csv',
    });
  });

  it('should validate file requirements', () => {
    const mockForm = new FormGroup({
      link: new FormControl(''),
      fileName: new FormControl(''),
    });

    expect(component.fileValidator(mockForm)).toEqual({ error: true });

    mockForm.patchValue({ link: 'test' });
    expect(component.fileValidator(mockForm)).toBeNull();

    mockForm.patchValue({ link: '', fileName: 'test.csv' });
    expect(component.fileValidator(mockForm)).toBeNull();
  });
});
