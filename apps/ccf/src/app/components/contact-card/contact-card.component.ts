import { Component, Input } from '@angular/core';
import { ContactCard } from './contact-card';

/** Displayes a card with contact information for an user */
@Component({
  selector: 'contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss'],
})
export class ContactCardComponent {
  /** Details of an user to be displayed inside the card */
  @Input() contactCard: ContactCard[];
}
