import { inject, Injectable } from '@angular/core';
import { ContactService } from '@hra-ui/services';
import { Action, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SendMessage } from './contact.actions';

/** A state, and injectable class ContactState for managing the contact information and sending messages using the ContactService. State name: 'contact' */
@State<void>({ name: 'contact' })
@Injectable()
export class ContactState {
  /** A variable to inject the ContactService */
  private readonly contact = inject(ContactService);

  /** An action method for sending a message. It uses SendMessage action class to send messages. */
  @Action(SendMessage)
  sendMessage(_ctx: StateContext<void>, { message }: SendMessage): Observable<void> {
    return this.contact.sendMessage(message);
  }
}
