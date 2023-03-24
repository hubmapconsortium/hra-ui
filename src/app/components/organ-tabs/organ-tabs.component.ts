import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrganData } from '../two-dim-image/two-dim-image';

@Component({
  selector: 'ccf-organ-tabs',
  templateUrl: './organ-tabs.component.html',
  styleUrls: ['./organ-tabs.component.scss']
})
export class OrganTabsComponent {
  @Input() tabs: OrganData[];
  @Input() currentOrgan: string;
  @Input() panelClass: string;
  @Output() organName = new EventEmitter<string>;

  get selectedIndex(): number {
    const index = this.tabs.findIndex(item => item.name === this.currentOrgan);
    return index >= 0 ? index : 0;
  }
}
