import { Component, Input } from '@angular/core';
import { PageDataItems } from './page-data';

/** Displays data on the page */
@Component({
  selector: 'ccf-page-data',
  templateUrl: './page-data.component.html',
  styleUrls: ['./page-data.component.scss'],
  standalone: false,
})
export class PageDataComponent {
  /** Details to be displayed on the page */
  @Input() data: PageDataItems[] = [];
}
