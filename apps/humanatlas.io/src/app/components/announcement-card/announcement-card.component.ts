import { Component, Input } from '@angular/core';
import { Announcement } from './announcement-card';

/** Displays an outlined card with an announcement inside */
@Component({
  selector: 'announcement-card',
  templateUrl: './announcement-card.component.html',
  styleUrls: ['./announcement-card.component.scss'],
  standalone: false,
})
export class AnnouncementCardComponent {
  /** Message to be shown to the users */
  @Input() messages: Announcement[] = [];
}
