import { Component, EventEmitter, Input, Output } from '@angular/core';
import { organTabs } from './organ-tabs';

@Component({
  selector: 'ccf-organ-tabs',
  templateUrl: './organ-tabs.component.html',
  styleUrls: ['./organ-tabs.component.scss']
})
export class OrganTabsComponent {

  @Input() tabs: organTabs[] = []

  @Output() organName = new EventEmitter<string>;

}
