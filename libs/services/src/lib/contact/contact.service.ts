import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/** A interface contact which defines email, subject, and the message. */
export interface ContactMessage {
  /** A variable email which accepts the email entered by user */
  email: string;
  /** A variable subject which accepts the subject entered by user */
  subject: string;
  /** A variable message which accepts the message entered by user */
  message: string;
}

@Injectable()
export abstract class ContactService {
  abstract sendMessage(message: ContactMessage): Observable<void>;
}
