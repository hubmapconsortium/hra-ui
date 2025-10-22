import { coerceArray } from '@angular/cdk/coercion';
import { ViewportScroller } from '@angular/common';
import {
  booleanAttribute,
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
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HraCommonModule, monitorHeight } from '@hra-ui/common';
import { CustomScrollService } from '@hra-ui/common/custom-scroll';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { ContentTemplateOutletDirective } from '@hra-ui/cdk/content-template';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import {
  PageSectionComponent,
  providePageSectionNavigation,
} from '@hra-ui/design-system/content-templates/page-section';
import { NavigationModule } from '@hra-ui/design-system/navigation';
import { CtaConfig, HeaderComponent } from '@hra-ui/design-system/navigation/header';
import { TableOfContentsComponent } from '@hra-ui/design-system/navigation/table-of-contents';
import { MarkdownComponent } from '@hra-ui/design-system/content-templates/markdown';
import { AppLayoutData } from './app-layout.schema';

/** Padding when scrolling to an anchor in px */
const ANCHOR_SCROLL_PADDING = 24;

@Component({
  selector: 'hra-app-layout',
  imports: [
    HraCommonModule,
    NavigationModule,
    ContentTemplateOutletDirective,
    TableOfContentsComponent,
    PageSectionComponent,
    MarkdownComponent,
    MatIconModule,
    RouterModule,
    ButtonsModule,
  ],
  providers: [providePageSectionNavigation()],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.cta-active]': '!ctaDismissed()',
  },
})
export class AppLayoutComponent {
  /** Layout data */
  readonly data = input.required<AppLayoutData>();

  /** Whether the navigation panel is hidden */
  readonly hideNavigation = input(false, { transform: booleanAttribute });
  /** Whether the table of contents is hidden */
  readonly hideToc = input(false, { transform: booleanAttribute });
  /** Whether the footer is hidden */
  readonly hideFooter = input(false, { transform: booleanAttribute });

  /** Header content data */
  protected readonly headerContent = computed(() => coerceArray(this.data().headerContent ?? []));
  /** Content data */
  protected readonly content = computed(() => coerceArray(this.data().content));

  /** Whether the screen width is currently greater than or equal to 1100px */
  protected isWideScreen = watchBreakpoint('(min-width: 1100px)');

  /** Reference to the header html element */
  private readonly header = viewChild.required(HeaderComponent, {
    read: ElementRef,
  });

  /** Call to action message */
  protected readonly cta: CtaConfig = {
    description: '🎉  9th Release (v2.3) has arrived!',
    action: 'Learn more',
    url: 'https://humanatlas.io/release-notes/v2.3',
  };

  /** Whether the CTA is dismissed or not */
  protected readonly ctaDismissed = signal(false);

  /** The height of the header given by the monitor */
  private readonly headerHeight = monitorHeight(this.header);

  /** Sets up scrolling behavior */
  constructor() {
    inject(CustomScrollService);
    const scroller = inject(ViewportScroller);

    effect(() => {
      const yOffset = this.headerHeight() + ANCHOR_SCROLL_PADDING;
      scroller.setOffset([0, yOffset]);
    });
  }
}
