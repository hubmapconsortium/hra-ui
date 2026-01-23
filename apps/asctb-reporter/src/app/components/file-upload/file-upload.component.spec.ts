import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { FileUploadComponent } from './file-upload.component';

describe('FileUploadComponent', () => {
  const createMockFile = (name = 'test.csv') => new File(['test'], name, { type: 'text/csv' });

  const renderComponent = async () => render(FileUploadComponent);

  it('should render upload button', async () => {
    await renderComponent();
    expect(screen.getByRole('button', { name: /upload/i })).toBeInTheDocument();
  });

  it('should handle file selection and update fileName and emit formData', async () => {
    const { container, fixture } = await renderComponent();
    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    const file = createMockFile();
    const spy = jest.fn();
    // attach to output
    jest.spyOn(fixture.componentInstance.fileFormDataEvent, 'emit').mockImplementation(spy);

    await userEvent.upload(fileInput, file);

    expect(screen.getByText('test.csv')).toBeInTheDocument();
    expect(spy).toHaveBeenCalled();
  });

  it('should remove file and clear fileName', async () => {
    const { container, fixture } = await renderComponent();
    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    const file = createMockFile();
    const spy = jest.fn();
    jest.spyOn(fixture.componentInstance.fileFormDataEvent, 'emit').mockImplementation(spy);

    await userEvent.upload(fileInput, file);
    const deleteBtn = container.querySelector('[hraFeature="delete"]') as HTMLElement;
    await userEvent.click(deleteBtn);

    expect(container.querySelector('.filename')).toBeNull();
    expect(spy).toHaveBeenCalled();
  });

  it('should trigger input click when upload button is clicked', async () => {
    const { container } = await renderComponent();
    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    const clickSpy = jest.spyOn(fileInput, 'click');

    const uploadBtn = screen.getByRole('button', { name: /upload/i });
    await userEvent.click(uploadBtn);

    expect(clickSpy).toHaveBeenCalled();
  });

  it('should implement ControlValueAccessor interface', async () => {
    const { fixture } = await renderComponent();
    const component = fixture.componentInstance;

    const callbacks = {
      onChange: jest.fn(),
      onTouched: jest.fn(),
      onValidatorChange: jest.fn(),
    };

    component.writeValue('test-file.csv');
    expect(component.fileName).toBe('test-file.csv');

    component.registerOnChange(callbacks.onChange);
    component.registerOnTouched(callbacks.onTouched);
    component.registerOnValidatorChange(callbacks.onValidatorChange);

    component.onChange('test');
    component.onTouched();
    component.onValidatorChange();

    expect(callbacks.onChange).toHaveBeenCalledWith('test');
    expect(callbacks.onTouched).toHaveBeenCalled();
    expect(callbacks.onValidatorChange).toHaveBeenCalled();

    expect(component.validate()).toBeNull();
  });
});
