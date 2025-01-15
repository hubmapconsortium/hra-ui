import { Component, Input } from '@angular/core';
import { SopLinks } from './sop-links';

/** Displays a list of URLs with title */
@Component({
  selector: 'ccf-sop-links',
  templateUrl: './sop-links.component.html',
  styleUrls: ['./sop-links.component.scss'],
  standalone: false,
})
export class SopLinksComponent {
  /** Title and details of URLs to be displayed */
  @Input() links!: SopLinks;
}
