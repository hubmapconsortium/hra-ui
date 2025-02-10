import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HubmapMenu } from '../types/hubmap-menu.schema';
import { HubmapMenuContentComponent } from './content/hubmap-menu-content.component';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';

@Component({
  selector: 'hra-hubmap-menu',
  standalone: true,
  imports: [CommonModule, ScrollingModule, HubmapMenuContentComponent],
  templateUrl: './hubmap-menu.component.html',
  styleUrl: './hubmap-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HubmapMenuComponent {
  readonly menu = input.required<HubmapMenu>();
}
