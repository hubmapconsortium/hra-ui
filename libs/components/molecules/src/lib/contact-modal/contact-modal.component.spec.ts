import { Shallow } from 'shallow-render';

import { ContactModalComponent } from './contact-modal.component';

describe('ContactModalComponent', () => {
  const testEmail = 'example@domain.com';
  const testContactData = {
    email: testEmail,
    subject: 'Test Subject',
    message: 'Test Message',
  };

  let shallow: Shallow<ContactModalComponent>;

  beforeEach(() => {
    shallow = new Shallow(ContactModalComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  it('should assign data for the specified key', async () => {
    const { instance } = await shallow.render();
    instance.updateData('email', testEmail);
    expect(instance.contactData.email).toEqual(testEmail);
  });

  it('should emit contact data with entered contact data', async () => {
    const { instance, outputs } = await shallow.render();
    instance.contactData = testContactData;
    instance.submit();
    expect(outputs.submitClick.emit).toBeCalledWith(testContactData);
  });
});
