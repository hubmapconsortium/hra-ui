import { PageHeaderItems } from './page-header-items';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ccf-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {

  @Input()
  headerCard: PageHeaderItems[] = []

}
