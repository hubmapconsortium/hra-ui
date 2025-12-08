import { CdkConnectedOverlay, ConnectedPosition, Overlay, OverlayModule } from '@angular/cdk/overlay';
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { EventType } from '@angular/router';
import { Breakpoints, watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { HraCommonModule } from '@hra-ui/common';
import { injectRouter, RouterExtModule } from '@hra-ui/common/router-ext';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { explicitEffect } from 'ngxtension/explicit-effect';
import { filter } from 'rxjs';
import { MegaMenuComponent } from './mega-menu/mega-menu.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { MENUS } from './static-data/parsed';
import { Menu } from './types/menus.schema';

/** Position of the mobile menu overlay */
const MOBILE_MENU_POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'top' },
];
/** Position of the desktop menu overlay */
const DESKTOP_MENU_POSITIONS: ConnectedPosition[] = [
  { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetX: -16, offsetY: 16 },
];

/**
 * CNS Website header component
 */
@Component({
  selector: 'cns-header',
  imports: [
    HraCommonModule,
    RouterExtModule,
    OverlayModule,
    MatIconModule,
    ButtonsModule,
    InlineSVGModule,
    MobileMenuComponent,
    MegaMenuComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  /** Navigation options to display on the header */
  readonly menuOptions = input(MENUS);
  /** Whether to show the filter menu icon */
  readonly enableFilterMenu = input<boolean>(true);

  /** Whether the screen is currently mobile sized */
  protected readonly isMobile = watchBreakpoint(Breakpoints.Mobile);
  /** Reference to this component's html element */
  private readonly elementRef = inject<ElementRef<Element>>(ElementRef);

  /** Overlay positions for the mobile menu */
  protected readonly mobileMenuPositions = MOBILE_MENU_POSITIONS;
  /** Overlay positions for the desktop menu */
  protected readonly desktopMenuPositions = DESKTOP_MENU_POSITIONS;
  /** Blocking overlay scroll strategy */
  protected readonly mobileMenuBlockScroll = inject(Overlay).scrollStrategies.block();
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
  private readonly activeMenu = signal<Menu | 'mobile' | undefined>(undefined);

  /** Initialize the header */
  constructor() {
    effect((cleanup) => {
      if (this.activeMenu() !== undefined) {
        const observer = this.attachResizeObserver();
        cleanup(() => observer.disconnect());
      }
    });

    explicitEffect([this.menuOffsetPx], () => this.updateMenuPositions(), { defer: true });

    injectRouter({ optional: true })
      ?.events.pipe(
        takeUntilDestroyed(),
        filter((navigationEvent) =>
          [EventType.NavigationEnd, EventType.NavigationSkipped].includes(navigationEvent.type),
        ),
      )
      .subscribe(() => this.closeMenu());
  }

  /**
   * Determine whether the specified menu is open
   *
   * @param menu The menu to check
   * @returns true if the menu is open, false otherwise
   */
  isMenuActive(menu: Menu | 'mobile'): boolean {
    return this.activeMenu() === menu;
  }

  /**
   * Toggles a menu open or close
   *
   * @param menu Menu to toggle
   */
  toggleMenu(menu: Menu | 'mobile'): void {
    this.activeMenu.update((current) => (menu !== current ? menu : undefined));
  }

  /**
   * Closes any active menu
   */
  closeMenu(menu?: Menu | 'mobile'): void {
    this.activeMenu.update((current) => (menu !== undefined && current !== menu ? current : undefined));
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
    /* istanbul ignore next */
    this.mobileMenuOverlay()?.overlayRef?.updatePosition();
  }
}
