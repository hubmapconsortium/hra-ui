import { inject, Injectable } from '@angular/core';
import { ContactService } from '@hra-ui/services';
import { Action, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SendMessage } from './contact.actions';

@State<void>({ name: 'contact' })
@Injectable()
export class ContactState {
  private readonly contact = inject(ContactService);

  @Action(SendMessage)
  sendMessage(_ctx: StateContext<void>, { message }: SendMessage): Observable<void> {
    return this.contact.sendMessage(message);
  }
}
