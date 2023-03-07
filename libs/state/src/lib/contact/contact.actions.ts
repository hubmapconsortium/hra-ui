import { ContactMessage } from './contact.model';

/** An action class which sends the message which consists of email, subject, and message entered by user. */
export class SendMessage {
  /** A variable to send message of type Contact */
  static readonly type = '[Contact] Send Message';
  /** A constructor of SendMessage class which initializes the message of type ContactMessage interface. */
  constructor(readonly message: ContactMessage) {}
}
