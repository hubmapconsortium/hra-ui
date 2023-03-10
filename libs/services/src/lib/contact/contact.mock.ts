import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { ContactMessage, ContactService } from './contact.service';

/** This class represents mock implementation of the ContactService class. It extends ContactService class and implements sendMessage method which just pritns message on console. */
@Injectable({
  providedIn: 'root',
})
export class MockContactService extends ContactService {
  /** It accepts an object of type ContactMessage and currently logs the message contents on the console. */
  sendMessage(message: ContactMessage): Observable<void> {
    console.log('Message received. Content: ' + JSON.stringify(message));
    return EMPTY;
  }
}
