import { FileUploadComponent } from './file-upload.component';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;

  const createMockFile = (name = 'test.csv') => new File(['test'], name, { type: 'text/csv' });
  const createFileEvent = (file: File) => ({ target: { files: [file] } }) as unknown as Event;
  const createMockInput = (value = '') => ({ value, click: jest.fn() }) as unknown as HTMLInputElement;

  beforeEach(() => {
    component = new FileUploadComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle file selection and update fileName', () => {
    const mockFile = createMockFile();
    const mockEvent = createFileEvent(mockFile);
    jest.spyOn(component, 'onChange');

    component.onFileSelected(mockEvent);

    expect(component.fileName).toBe('test.csv');
    expect(component.onChange).toHaveBeenCalledWith('test.csv');
  });

  it('should remove file and clear fileName', () => {
    const mockInput = createMockInput('test.csv');
    component.fileName = 'test.csv';

    component.onFileRemove(mockInput);

    expect(mockInput.value).toBe('');
    expect(component.fileName).toBe('');
  });

  it('should trigger input click', () => {
    const mockInput = createMockInput();
    component.onClick(mockInput);
    expect(mockInput.click).toHaveBeenCalled();
  });

  it('should implement ControlValueAccessor interface', () => {
    const callbacks = {
      onChange: jest.fn(),
      onTouched: jest.fn(),
      onValidatorChange: jest.fn(),
    };

    // Test writeValue
    component.writeValue('test-file.csv');
    expect(component.fileName).toBe('test-file.csv');

    // Test callback registration and execution
    component.registerOnChange(callbacks.onChange);
    component.registerOnTouched(callbacks.onTouched);
    component.registerOnValidatorChange(callbacks.onValidatorChange);

    component.onChange('test');
    component.onTouched();
    component.onValidatorChange();

    expect(callbacks.onChange).toHaveBeenCalledWith('test');
    expect(callbacks.onTouched).toHaveBeenCalled();
    expect(callbacks.onValidatorChange).toHaveBeenCalled();

    // Test validation
    expect(component.validate()).toBeNull();
  });
});
