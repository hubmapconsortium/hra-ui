import { CdkConnectedOverlay, ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule, ProgressBarMode } from '@angular/material/progress-bar';
import { Breakpoints, watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { BrandModule } from '@hra-ui/design-system/brand';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { CtaBarComponent } from '@hra-ui/design-system/navigation/cta-bar';
import { explicitEffect } from 'ngxtension/explicit-effect';
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

const PARSED_HUBMAP_MENU = HubmapMenuSchema.parse(HUBMAP_MENU_DATA);
const PARSED_MENUS = MenusSchema.parse(MENUS_DATA);

const MOBILE_MENU_POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
];
const DESKTOP_MENU_POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetX: -16, offsetY: 16 },
];

@Component({
  selector: 'hra-header-actions',
  standalone: true,
  template: `<ng-content></ng-content>`,
  styles: [':host { display: flex; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderActionsComponent {}

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
  readonly hubmapMenu = input(PARSED_HUBMAP_MENU);
  readonly menus = input(PARSED_MENUS);
  readonly breadcrumbs = input<BreadcrumbItem[]>([]);
  readonly progress = input<boolean | number>(false);

  protected readonly ctaDismissed = signal(false);
  protected readonly progressMode = computed((): ProgressBarMode => {
    return typeof this.progress() === 'boolean' ? 'indeterminate' : 'determinate';
  });

  protected readonly isMobile = watchBreakpoint(Breakpoints.Mobile);
  private readonly elementRef = inject<ElementRef<Element>>(ElementRef);

  protected readonly mobileMenuPositions = MOBILE_MENU_POSITIONS;
  protected readonly desktopMenuPositions = DESKTOP_MENU_POSITIONS;
  protected readonly menuOffsetPx = signal<number>(0);
  protected readonly mobileMenuHeight = computed(() => `calc(100vh - ${this.menuOffsetPx()}px)`);
  protected readonly desktopMenuMaxHeight = computed(() => `calc(100vh - ${this.menuOffsetPx()}px - 16px)`);
  private readonly mobileMenuOrigin = viewChild.required('mobileMenuOrigin', { read: ElementRef });
  private readonly desktopMenuOrigin = viewChild.required('desktopMenuOrigin', { read: ElementRef });
  private readonly mobileMenuOverlay = viewChild('mobileMenuOverlay', { read: CdkConnectedOverlay });
  private readonly activeMenu = signal<Menu | 'main' | undefined>(undefined);

  constructor() {
    effect((cleanup) => {
      if (this.activeMenu() !== undefined) {
        const observer = this.attachResizeObserver();
        cleanup(() => observer.disconnect());
      }
    });

    explicitEffect([this.menuOffsetPx], () => this.updateMenuPositions());
  }

  isMenuActive(menu: Menu | 'main'): boolean {
    return this.activeMenu() === menu;
  }

  toggleMenu(menu: Menu | 'main'): void {
    if (menu !== this.activeMenu()) {
      const { bottom } = this.getMenuOriginBbox();
      this.activeMenu.set(menu);
      this.menuOffsetPx.set(bottom);
    } else {
      this.activeMenu.set(undefined);
    }
  }

  closeMenu(): void {
    this.activeMenu.set(undefined);
  }

  private attachResizeObserver(): ResizeObserver {
    const observer = new ResizeObserver(() => {
      const { bottom } = this.getMenuOriginBbox();
      this.menuOffsetPx.set(bottom);
    });

    observer.observe(this.elementRef.nativeElement, { box: 'border-box' });
    return observer;
  }

  private getMenuOriginBbox(): DOMRect {
    const origin = this.isMobile() ? this.mobileMenuOrigin() : this.desktopMenuOrigin();
    return (origin.nativeElement as Element).getBoundingClientRect();
  }

  private updateMenuPositions(): void {
    this.mobileMenuOverlay()?.overlayRef?.updatePosition();
  }
}
