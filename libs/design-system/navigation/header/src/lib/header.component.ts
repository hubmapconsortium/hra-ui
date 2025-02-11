import { BreakpointObserver } from '@angular/cdk/layout';
import { CdkConnectedOverlay, ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, viewChild } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrandModule } from '@hra-ui/design-system/brand';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { CtaBarComponent } from '@hra-ui/design-system/navigation/cta-bar';
import { effectOnceIf } from 'ngxtension/effect-once-if';
import { map } from 'rxjs';
import { DesktopMenuComponent } from './desktop-menu/desktop-menu.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import HUBMAP_MENU_DATA from './static-data/hubmap-menu.json';
import MENUS_DATA from './static-data/menus.json';
import { HubmapMenuSchema } from './types/hubmap-menu.schema';
import { Menu, MenusSchema } from './types/menus.schema';

export interface CtaConfig {
  action: string;
  description: string;
  url: string;
}

const LARGE_SCREEN_BREAKPOINT = '(min-width: 640px)';

const PARSED_HUBMAP_MENUS = HubmapMenuSchema.parse(HUBMAP_MENU_DATA);
const PARSED_MENUS = MenusSchema.parse(MENUS_DATA);

const DESKTOP_MENU_BOTTOM_MARGIN = '16px';
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

const MOBILE_MENU_POSITIONS: ConnectedPosition[] = [
  {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
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
    MobileMenuComponent,
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

  protected readonly breakpointObserver = inject(BreakpointObserver);
  protected readonly isLargeScreen$ = this.breakpointObserver
    .observe(LARGE_SCREEN_BREAKPOINT)
    .pipe(map(({ matches }) => matches));

  private readonly ctaEl = viewChild<ElementRef<HTMLElement>>('ctaEl');
  private readonly menusEl = viewChild.required<ElementRef<HTMLElement>>('menusEl');
  private readonly headerEl = viewChild<ElementRef<HTMLElement>>('headerEl');

  protected readonly desktopMenuPositions = DESKTOP_MENU_POSITIONS;
  protected readonly desktopMenuMaxHeight = computed(() => {
    const offset = this.getTotalElementHeights(this.ctaEl(), this.menusEl());
    return `calc(100vh - ${offset}px - ${DESKTOP_MENU_BOTTOM_MARGIN})`;
  });

  protected readonly mobileMenuPositions = MOBILE_MENU_POSITIONS;
  protected readonly mobileMenuOverlay = viewChild('mobileMenuOverlay', { read: CdkConnectedOverlay });
  protected readonly mobileMenuHeight = computed(() => {
    const offset = this.getTotalElementHeights(this.ctaEl(), this.headerEl());
    return `calc(100vh - ${offset}px)`;
  });

  protected ctaDismissed = false;
  private activeMenuId?: string;

  constructor() {
    // Update mobile menu position when the cta is closed
    effectOnceIf(
      () => this.ctaEl() === undefined,
      () => this.mobileMenuOverlay()?.overlayRef?.updatePosition(),
    );
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

  private getTotalElementHeights(...elems: (ElementRef<HTMLElement> | undefined)[]): number {
    return elems
      .filter((el) => el !== undefined)
      .map((el) => el.nativeElement.getBoundingClientRect().height)
      .reduce<number>((total, height) => total + height, 0);
  }
}
