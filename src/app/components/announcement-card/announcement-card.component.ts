import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Announcement } from './announcement-card';

@Component({
  selector: 'announcement-card',
  templateUrl: './announcement-card.component.html',
  styleUrls: ['./announcement-card.component.scss']
})
export class AnnouncementCardComponent {
  @Input() messages: Announcement[] = [ ]
}
