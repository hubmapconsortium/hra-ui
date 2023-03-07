import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { ContactMessage, ContactService } from './contact.service';

@Injectable({
  providedIn: 'root',
})
export class MockContactService extends ContactService {
  sendMessage(message: ContactMessage): Observable<void> {
    console.log('Message received. Content: ' + JSON.stringify(message));
    return EMPTY;
  }
}
