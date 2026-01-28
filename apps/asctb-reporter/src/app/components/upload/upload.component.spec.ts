import { FormGroup } from '@angular/forms';
import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { UploadComponent } from './upload.component';

describe('UploadComponent', () => {
  it('renders upload interface', async () => {
    await render(UploadComponent);

    expect(screen.getByText(/upload file/i)).toBeInTheDocument();
    expect(screen.getByText(/link url/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /templates/i })).toBeInTheDocument();
  });

  it('validates and submits Google Sheets link', async () => {
    const { fixture } = await render(UploadComponent);
    const user = userEvent.setup();
    const uploadSpy = jest.spyOn(fixture.componentInstance.uploadForm, 'emit');

    await user.click(screen.getByText(/link url/i));
    await user.type(
      screen.getByRole('textbox'),
      'https://docs.google.com/spreadsheets/d/test123456789012345/edit#gid=123',
    );
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(uploadSpy).toHaveBeenCalledWith({
      link: 'https://docs.google.com/spreadsheets/d/test123456789012345/edit#gid=123',
      formData: '',
      fileName: '',
      sheetId: 'test123456789012345',
      gid: '123',
      csvUrl: '',
    });
  });

  it('prevents invalid form submission', async () => {
    const { fixture } = await render(UploadComponent);
    const uploadSpy = jest.spyOn(fixture.componentInstance.uploadForm, 'emit');

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(uploadSpy).not.toHaveBeenCalled();
  });

  it('submits CSV URL', async () => {
    const { fixture } = await render(UploadComponent);
    const user = userEvent.setup();
    const uploadSpy = jest.spyOn(fixture.componentInstance.uploadForm, 'emit');

    await user.click(screen.getByText(/link url/i));
    await user.type(screen.getByRole('textbox'), 'https://example.com/data.csv');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(uploadSpy).toHaveBeenCalledWith({
      link: 'https://example.com/data.csv',
      formData: '',
      fileName: '',
      sheetId: '0',
      gid: '0',
      csvUrl: 'https://example.com/data.csv',
    });
  });

  it('uploads file and clears link validators', async () => {
    const { fixture, container } = await render(UploadComponent);
    const user = userEvent.setup();
    const component = fixture.componentInstance;
    const uploadSpy = jest.spyOn(component.uploadForm, 'emit');
    const file = new File(['test content'], 'test.csv', { type: 'text/csv' });

    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    await user.upload(fileInput, file);

    expect(component.formValid).toBeTruthy();

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(uploadSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        link: '',
        fileName: 'test.csv',
        sheetId: '0',
        gid: '0',
        csvUrl: '',
      }),
    );
  });

  it('opens templates menu', async () => {
    await render(UploadComponent);

    await userEvent.click(screen.getByRole('button', { name: /templates/i }));

    expect(screen.getByRole('menuitem', { name: /asct\+b table template/i })).toHaveAttribute(
      'href',
      'https://docs.google.com/spreadsheets/d/1smQ8_3F-KSRlY7bmozsoM1EonQL4ahNaXP7zeQFf3Ko/edit#gid=0',
    );
    expect(screen.getByRole('menuitem', { name: /omap compare template/i })).toHaveAttribute(
      'href',
      'https://docs.google.com/spreadsheets/d/1DE4Bh2PI7mgaMciMOky2OTduNwYNRU-DyYQPT8szJ-Y/edit#gid=0',
    );
  });

  it('submits malformed Google Sheets URL as CSV', async () => {
    const { fixture } = await render(UploadComponent);
    const user = userEvent.setup();
    const component = fixture.componentInstance;
    const uploadSpy = jest.spyOn(component.uploadForm, 'emit');

    component.formGroup.get('link')?.clearValidators();
    component.formGroup.get('link')?.updateValueAndValidity();

    await user.click(screen.getByText(/link url/i));
    await user.type(screen.getByRole('textbox'), 'https://docs.google.com/spreadsheets/d/abc123');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(uploadSpy).toHaveBeenCalledWith({
      link: 'https://docs.google.com/spreadsheets/d/abc123',
      formData: '',
      fileName: '',
      sheetId: '0',
      gid: '0',
      csvUrl: 'https://docs.google.com/spreadsheets/d/abc123',
    });
  });

  it('validates null form group in fileValidator', async () => {
    const { fixture } = await render(UploadComponent);

    expect(fixture.componentInstance.fileValidator(null as unknown as FormGroup)).toEqual({ error: true });
  });

  it('handles undefined checkLinkFormat result', async () => {
    const { fixture } = await render(UploadComponent);
    const user = userEvent.setup();
    const component = fixture.componentInstance;
    const uploadSpy = jest.spyOn(component.uploadForm, 'emit');
    const mockFormData = new FormData();

    jest.spyOn(component, 'checkLinkFormat').mockReturnValue(undefined as any);

    component.upload(mockFormData);
    component.formGroup.patchValue({ fileName: 'test.csv' });
    fixture.detectChanges();

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(uploadSpy).toHaveBeenCalledWith({
      link: '',
      formData: mockFormData,
      fileName: 'test.csv',
      sheetId: '',
      gid: '',
      csvUrl: '',
    });
  });
});
