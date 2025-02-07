import { BreakpointObserver } from '@angular/cdk/layout';
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
import MENUS_DATA from './static-data/menus.json';
import { MenusSchema, Menu } from './types/menus.schema';
import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { DesktopMenuComponent } from './desktop-menu/desktop-menu.component';

export interface CtaConfig {
  action: string;
  description: string;
  url: string;
}

const LARGE_SCREEN_BREAKPOINT = '(min-width: 640px)';
const PARSED_MENUS = MenusSchema.parse(MENUS_DATA);
const MENU_POSITIONS: ConnectedPosition[] = [
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
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly cta = input<CtaConfig>();
  readonly menus = input(PARSED_MENUS);
  readonly breadcrumbs = input<BreadcrumbItem[]>([]);

  protected readonly menuPositions = MENU_POSITIONS;

  protected readonly breakpointObserver = inject(BreakpointObserver);
  protected readonly isLargeScreen$ = this.breakpointObserver
    .observe(LARGE_SCREEN_BREAKPOINT)
    .pipe(map(({ matches }) => matches));

  protected ctaDismissed = false;
  private activeMenuId?: string;

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
