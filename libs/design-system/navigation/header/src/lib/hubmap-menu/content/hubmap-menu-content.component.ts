import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { HUBMAP_MENU_TEMPLATE_DIRECTIVES } from '../../directives/directives';
import { HubmapMenu } from '../../types/hubmap-menu.schema';

@Component({
  selector: 'hra-hubmap-menu-content',
  standalone: true,
  imports: [CommonModule, AssetUrlPipe, ButtonsModule, ScrollingModule, HUBMAP_MENU_TEMPLATE_DIRECTIVES],
  templateUrl: './hubmap-menu-content.component.html',
  styleUrl: './hubmap-menu-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HubmapMenuContentComponent {
  readonly menu = input.required<HubmapMenu>();
}
