import { Injectable } from '@angular/core';
import { ContactMessage, ContactService } from './contact.service';
import { EMPTY, Observable } from 'rxjs';

/** ContactImplService - Angular service that handles sending emails from the contact modal */
@Injectable({
  providedIn: 'root',
})
export class ContactImplService extends ContactService {
  /** Overrides the sendMessage method to send message via email to the recipient */
  override sendMessage(message: ContactMessage): Observable<void> {
    const anchor = document.createElement('a');
    document.body.appendChild(anchor);
    anchor.target = '_blank';
    anchor.href = `mailto:${message.email}?subject=${message.subject}&body=${message.message}`;
    anchor.click();
    anchor.remove();
    return EMPTY;
  }
}
