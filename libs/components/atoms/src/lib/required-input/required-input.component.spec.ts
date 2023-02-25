import { Shallow } from 'shallow-render';
import { RequiredInputComponent } from './required-input.component';

describe('TextFieldComponent', () => {
  let shallow: Shallow<RequiredInputComponent>;

  beforeEach(() => {
    shallow = new Shallow(RequiredInputComponent);
  });

  it('should create', async () => {
    const { instance } = await shallow.render();
    expect(instance).toBeTruthy();
  });

  it('should show error message if input is empty', async () => {
    const { find, instance } = await shallow.render({ bind: { label: 'Test Label', error: 'This field is required' } });
    const input = find('input');

    input.nativeElement.value = '';
    input.nativeElement.dispatchEvent(new Event('input'));
    expect(instance.formControl.invalid).toBe(true);
    expect(find('mat-error').nativeElement.textContent.trim()).toBe('This field is required');
  });

  it('should not show error message if input is not empty', async () => {
    const { find, instance } = await shallow.render({ bind: { label: 'Test Label', error: 'This field is required' } });
    const input = find('input');

    input.nativeElement.value = 'hello';
    input.nativeElement.dispatchEvent(new Event('input'));
    expect(instance.formControl.invalid).toBe(false);
  });
});
