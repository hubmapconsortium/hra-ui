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
import { HUBMAP_MENU, MENUS } from './static-data/parsed';
import { Menu } from './types/menus.schema';

/** Call to action configuration */
export interface CtaConfig {
  /** Action text */
  action: string;
  /** Action description */
  description: string;
  /** Action url */
  url: string;
}

/** Position of the mobile menu overlay */
const MOBILE_MENU_POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
];
/** Position of the desktop menu overlay */
const DESKTOP_MENU_POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetX: -16, offsetY: 16 },
];

/**
 * Global navigation header.
 * Includes a call to action bar, navigation menus, breadcrumbs, and a progress bar.
 */
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
  /** Call to action configuration */
  readonly cta = input<CtaConfig>();
  /** Hubmap menu data */
  readonly hubmapMenu = input(HUBMAP_MENU);
  /** All other menus */
  readonly menus = input(MENUS);
  /** Breadcrumb items */
  readonly breadcrumbs = input<BreadcrumbItem[]>([]);
  /**
   * Progress bar progress.
   * Use `true` for an indeterminate bar and values between `0` and `100` for a determinate bar.
   * Using false disables and hides the progress bar.
   */
  readonly progress = input<boolean | number>(false);

  /** Whether the user has dismissed the call to action */
  protected readonly ctaDismissed = signal(false);
  /** Progress bar mode */
  protected readonly progressMode = computed((): ProgressBarMode => {
    return typeof this.progress() === 'boolean' ? 'indeterminate' : 'determinate';
  });

  /** Whether the screen is currently mobile sized */
  protected readonly isMobile = watchBreakpoint(Breakpoints.Mobile);
  /** Reference to this component's html element */
  private readonly elementRef = inject<ElementRef<Element>>(ElementRef);

  /** Overlay positions for the mobile menu */
  protected readonly mobileMenuPositions = MOBILE_MENU_POSITIONS;
  /** Overlay positions for the desktop menu */
  protected readonly desktopMenuPositions = DESKTOP_MENU_POSITIONS;
  /** Offset from top to the menu. Used to calculate menu heights and max heights */
  protected readonly menuOffsetPx = signal<number>(0);
  /** Mobile menu height. Fills the entire screen */
  protected readonly mobileMenuHeight = computed(() => `calc(100vh - ${this.menuOffsetPx()}px)`);
  /** Desktop menu max height */
  protected readonly desktopMenuMaxHeight = computed(() => `calc(100vh - ${this.menuOffsetPx()}px - 16px)`);
  /** Mobile menu overlay origin */
  private readonly mobileMenuOrigin = viewChild.required('mobileMenuOrigin', { read: ElementRef });
  /** Desktop menu overlay origin */
  private readonly desktopMenuOrigin = viewChild.required('desktopMenuOrigin', { read: ElementRef });
  /** Reference to the mobile overlay */
  private readonly mobileMenuOverlay = viewChild('mobileMenuOverlay', { read: CdkConnectedOverlay });
  /** Currently open menu or undefined */
  private readonly activeMenu = signal<Menu | 'main' | undefined>(undefined);

  /** Initialize the header */
  constructor() {
    effect(
      (cleanup) => {
        if (this.activeMenu() !== undefined) {
          const observer = this.attachResizeObserver();
          cleanup(() => observer.disconnect());
        }
      },
      { allowSignalWrites: true },
    );

    explicitEffect([this.menuOffsetPx], () => this.updateMenuPositions(), { defer: true });
  }

  /**
   * Determine whether the specified menu is open
   *
   * @param menu The menu to check
   * @returns true if the menu is open, false otherwise
   */
  isMenuActive(menu: Menu | 'main'): boolean {
    return this.activeMenu() === menu;
  }

  /**
   * Toggles a menu open or close
   *
   * @param menu Menu to toggle
   */
  toggleMenu(menu: Menu | 'main'): void {
    this.activeMenu.update((current) => (menu !== current ? menu : undefined));
  }

  /**
   * Closes any active menu
   */
  closeMenu(): void {
    this.activeMenu.set(undefined);
  }

  /**
   * Creates and attaches a resize observer that updates the menu offset
   * whenever the header size changes
   *
   * @returns The resize observer
   */
  private attachResizeObserver(): ResizeObserver {
    const observer = new ResizeObserver(() => this.updateMenuOffset());
    observer.observe(this.elementRef.nativeElement, { box: 'border-box' });
    this.updateMenuOffset();
    return observer;
  }

  /**
   * Computes the bounding box for the menu's overlay origin element
   *
   * @returns The computed bounding box
   */
  private getMenuOriginBbox(): DOMRect {
    const origin = this.isMobile() ? this.mobileMenuOrigin() : this.desktopMenuOrigin();
    return (origin.nativeElement as Element).getBoundingClientRect();
  }

  /**
   * Updates the menu offset based on the overlay origin's bounding box
   */
  private updateMenuOffset(): void {
    const { bottom } = this.getMenuOriginBbox();
    this.menuOffsetPx.set(bottom);
  }

  /**
   * Notify menu overlays of position changes
   */
  private updateMenuPositions(): void {
    this.mobileMenuOverlay()?.overlayRef?.updatePosition();
  }
}
