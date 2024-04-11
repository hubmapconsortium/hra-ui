import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrganData } from '../two-dim-image/two-dim-image';

/** Displays images of organs as tabs */
@Component({
  selector: 'ccf-organ-tabs',
  templateUrl: './organ-tabs.component.html',
  styleUrls: ['./organ-tabs.component.scss'],
})
export class OrganTabsComponent {
  /** Details of images to be displayed as tabs */
  @Input() tabs: OrganData[];

  /** Default organ name to be set initially */
  @Input() currentOrgan: string;

  /** Class name of the panel */
  @Input() panelClass: string;

  /** Emits the organ data when tab is clicked */
  @Output() organName = new EventEmitter<string>();

  /** Returns the index of the current selected organ tab */
  get selectedIndex(): number {
    const index = this.tabs.findIndex((item) => item.name === this.currentOrgan);
    return index >= 0 ? index : 0;
  }
}
