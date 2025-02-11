import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { HubmapMenuContentComponent } from '../hubmap-menu-content/hubmap-menu-content.component';
import { MenuContentComponent } from '../menu-content/menu-content.component';
import { HubmapMenu } from '../types/hubmap-menu.schema';
import { Menus } from '../types/menus.schema';

@Component({
  selector: 'hra-mobile-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    ScrollingModule,
    HubmapMenuContentComponent,
    MenuContentComponent,
  ],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileMenuComponent {
  readonly hubmapMenu = input.required<HubmapMenu>();
  readonly menus = input.required<Menus>();
}
