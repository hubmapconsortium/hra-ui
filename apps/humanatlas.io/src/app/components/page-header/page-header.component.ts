import { PageHeaderItems } from './page-header-items';
import { Component, Input } from '@angular/core';

/** Displays page header data inside a card */
@Component({
  selector: 'ccf-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  standalone: false,
})
export class PageHeaderComponent {
  /** Details to be displayed inside the card */
  @Input() headerCard: PageHeaderItems[] = [];
}
