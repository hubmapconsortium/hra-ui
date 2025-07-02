import { Shallow } from 'shallow-render';
import { RequiredInputComponent } from './required-input.component';

describe('RequiredInputComponent', () => {
  let shallow: Shallow<RequiredInputComponent>;

  beforeEach(() => {
    shallow = new Shallow(RequiredInputComponent);
  });

  it('should create', async () => {
    const { instance } = await shallow.render();
    expect(instance).toBeTruthy();
  });

  it('should show error message if input is empty', async () => {
    const { find, instance } = await shallow.render({ bind: { label: 'Test Label' } });

    instance.control.setValue('');
    expect(instance.control.invalid).toBe(true);
    expect(find('mat-error')).toHaveFoundOne();
  });

  it('should not show error message if input is not empty', async () => {
    const { instance } = await shallow.render({ bind: { label: 'Test Label' } });

    instance.control.setValue('abc');
    expect(instance.control.invalid).toBe(false);
  });
});
