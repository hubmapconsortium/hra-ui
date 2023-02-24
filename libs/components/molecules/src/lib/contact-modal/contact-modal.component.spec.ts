import { Shallow } from 'shallow-render';

import { ContactModalComponent } from './contact-modal.component';

describe('ContactModalComponent', () => {
  let shallow: Shallow<ContactModalComponent>;

  beforeEach(() => {
    shallow = new Shallow(ContactModalComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
