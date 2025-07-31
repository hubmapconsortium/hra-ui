import { Shallow } from 'shallow-render';

import { EmailInputComponent } from './email-input.component';

describe('EmailInputComponent', () => {
  let shallow: Shallow<EmailInputComponent>;

  beforeEach(() => {
    shallow = new Shallow(EmailInputComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  describe('emailChange', () => {
    it('should emit the entered email', async () => {
      const email = 'abc@iu.edu';
      const { instance, outputs } = await shallow.render();
      instance.control.setValue(email);
      expect(outputs.emailChange.emit).toHaveBeenCalledWith(email);
    });

    it('should emit undefined when the entered email is invalid', async () => {
      const email = 'a';
      const { instance, outputs } = await shallow.render();
      instance.control.setValue(email);
      expect(outputs.emailChange.emit).toHaveBeenCalledWith(undefined);
    });
  });
});
