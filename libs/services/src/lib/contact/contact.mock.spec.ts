import { MockContactService } from './contact.mock';
import { ContactMessage } from './contact.service';

describe('ContactService', () => {
  let service: MockContactService;
  const testMessage: ContactMessage = {
    email: 'test@test.com',
    subject: 'Test Subject',
    message: 'Test Message',
  };

  beforeEach(() => {
    service = new MockContactService();
  });

  afterEach(() => jest.restoreAllMocks());

  it('should print log', () => {
    const message = 'Message received. Content: ' + JSON.stringify(testMessage);
    const spy = jest.spyOn(console, 'log');
    service.sendMessage(testMessage);
    expect(spy).toHaveBeenCalledWith(message);
  });
});
