import { BreakpointObserver } from '@angular/cdk/layout';
import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrandModule } from '@hra-ui/design-system/brand';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { CtaBarComponent } from '@hra-ui/design-system/navigation/cta-bar';
import { map } from 'rxjs';
import { DesktopMenuComponent } from './desktop-menu/desktop-menu.component';
import { HubmapMenuComponent } from './hubmap-menu/hubmap-menu.component';
import HUBMAP_MENU_DATA from './static-data/hubmap-menu.json';
import MENUS_DATA from './static-data/menus.json';
import { HubmapMenuSchema } from './types/hubmap-menu.schema';
import { Menu, MenusSchema } from './types/menus.schema';

export interface CtaConfig {
  action: string;
  description: string;
  url: string;
}

const CTA_ELEMENT_HEIGHT_IN_REM = 2.5;
const MENUS_ELEMENT_HEIGHT_IN_REM = 4.5;
const DESKTOP_MENU_BOTTOM_MARGIN_IN_REM = 1;
const LARGE_SCREEN_BREAKPOINT = '(min-width: 640px)';
const PARSED_HUBMAP_MENUS = HubmapMenuSchema.parse(HUBMAP_MENU_DATA);
const PARSED_MENUS = MenusSchema.parse(MENUS_DATA);
const DESKTOP_MENU_POSITIONS: ConnectedPosition[] = [
  {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
    offsetX: -16,
    offsetY: 16,
  },
];

@Component({
  selector: 'hra-header',
  standalone: true,
  imports: [
    CommonModule,
    OverlayModule,
    MatDividerModule,
    MatIconModule,
    MatProgressBarModule,
    BrandModule,
    ButtonsModule,
    CtaBarComponent,
    DesktopMenuComponent,
    HubmapMenuComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly cta = input<CtaConfig>();
  readonly hubmapMenu = input(PARSED_HUBMAP_MENUS);
  readonly menus = input(PARSED_MENUS);
  readonly breadcrumbs = input<BreadcrumbItem[]>([]);

  protected readonly desktopMenuPositions = DESKTOP_MENU_POSITIONS;

  protected readonly breakpointObserver = inject(BreakpointObserver);
  protected readonly isLargeScreen$ = this.breakpointObserver
    .observe(LARGE_SCREEN_BREAKPOINT)
    .pipe(map(({ matches }) => matches));

  protected ctaDismissed = false;
  private activeMenuId?: string;

  protected get desktopMenuMaxHeight(): string {
    const offsetInRem =
      MENUS_ELEMENT_HEIGHT_IN_REM +
      (this.ctaDismissed ? 0 : CTA_ELEMENT_HEIGHT_IN_REM) +
      DESKTOP_MENU_BOTTOM_MARGIN_IN_REM;
    return `calc(100vh - ${offsetInRem}rem)`;
  }

  isMenuActive(menu: Menu | string): boolean {
    return this.activeMenuId === this.getMenuId(menu);
  }

  toggleMenu(menu: Menu | string): void {
    const id = this.getMenuId(menu);
    this.activeMenuId = this.activeMenuId !== id ? id : undefined;
  }

  private getMenuId(menu: Menu | string): string {
    return typeof menu === 'string' ? menu : menu.id;
  }
}
