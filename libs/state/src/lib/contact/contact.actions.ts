import { Action } from '@hra-ui/cdk/state';
import { ContactMessage } from '@hra-ui/services';

/** A class which sends individual messages submitted by user. */
export class SendMessage extends Action('[Contact] Send Message') {
  /** A constructor which initializes the message of type ContactMessage interface. */
  constructor(readonly message: ContactMessage) {
    super();
  }
}
