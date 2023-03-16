import { NgModule } from '@angular/core';
import { ContactMessage, ContactService } from '@hra-ui/services';
import { StateContext } from '@ngxs/store';
import { mock } from 'jest-mock-extended';
import { Shallow } from 'shallow-render';
import { SendMessage } from './contact.actions';
import { ContactState } from './contact.state';

@NgModule()
class TestModule {}

describe('ContactState', () => {
  const testMessage: ContactMessage = {
    email: 'test@test.com',
    subject: 'Test Subject',
    message: 'Test Message',
  };
  const testAction = new SendMessage(testMessage);
  const ctx = mock<StateContext<void>>();
  const contactService = mock<ContactService>();
  let shallow: Shallow<ContactState>;

  beforeEach(() => {
    shallow = new Shallow(ContactState, TestModule)
      .provide(ContactState)
      .provideMock({ provide: ContactService, useValue: contactService });
  });

  afterEach(() => jest.clearAllMocks());

  it('should call the contact service to send a message', async () => {
    const { instance, inject } = shallow.createService();
    instance.sendMessage(ctx, testAction);
    expect(inject(ContactService).sendMessage).toHaveBeenCalledWith(testMessage);
  });
});
