import { Component, Input, OnInit } from '@angular/core';
import { ContactCard } from './contact-card';

@Component({
  selector: 'contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent {
  @Input() contactCard: ContactCard[];
}
