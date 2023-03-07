import { Injectable } from '@angular/core';
import { Action, State } from '@ngxs/store';
import { SendMessage } from './contact.actions';

@State<void>({ name: 'contact' })
@Injectable()
export class ContactState {
  @Action(SendMessage)
  sendMessage(_ctx: unknown, { message }: SendMessage): void {
    //
  }
}
