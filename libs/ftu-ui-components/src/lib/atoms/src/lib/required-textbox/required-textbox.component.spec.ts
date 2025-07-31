import { Shallow } from 'shallow-render';

import { RequiredTextboxComponent } from './required-textbox.component';

describe('RequiredTextboxComponent', () => {
  let shallow: Shallow<RequiredTextboxComponent>;

  beforeEach(() => {
    shallow = new Shallow(RequiredTextboxComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  describe('emailChange', () => {
    it('should emit message when the entered a message', async () => {
      const message = 'a';
      const { instance, outputs } = await shallow.render();
      instance.control.setValue(message);
      expect(outputs.messageChange.emit).toHaveBeenCalledWith('a');
    });

    it('should emit undefined when the entered message is empty', async () => {
      const message = '';
      const { instance, outputs } = await shallow.render();
      instance.control.setValue(message);
      expect(outputs.messageChange.emit).toHaveBeenCalledWith(undefined);
    });
  });
});
