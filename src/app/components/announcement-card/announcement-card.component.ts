import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Announcement } from './announcement-card';

@Component({
  selector: 'announcement-card',
  templateUrl: './announcement-card.component.html',
  styleUrls: ['./announcement-card.component.scss']
})
export class AnnouncementCardComponent {
  @Input() messages: Announcement[] = [
    {
      message: "The 4th Release of the Human Reference Atlas (v1.3) is now available! See what's new in HRA v1.3 in ",
      route: 'v1.3',
      routeText: '4th Release Notes.',
      emoji: '🎉'
    },
    {
      message: "Warning: DOI registration in progress. HRA v1.3 DOI URLs will not work until further notice.",
      emoji: '⚠️'
    }
  ]
}
