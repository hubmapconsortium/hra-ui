import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, Subscription } from 'rxjs';
import { LongCard } from '../card-button-long/long-card';
import { PageDef } from './page-def';

/** Renders a component according to it's type */
@Component({
  selector: 'page-element',
  templateUrl: './page-element.component.html',
  styleUrls: ['./page-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageElementComponent {
  /** Details of element to be displayed */
  @Input() def!: PageDef;

  /** Subscriptions managed by this component. */
  private readonly subscriptions = new Subscription();

  /** Flag to check if page is scrolled */
  scrolled = false;

  /** Creates instance of Router, ActivatedRoute, ViewportScroller
   * and navigates to page element if fragment is changed */
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly scroller: ViewportScroller,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.subscriptions.add(
      this.route.fragment.pipe(delay(10)).subscribe((anchor) => {
        if (anchor) {
          this.scroller.scrollToAnchor(anchor);
        }
      }),
    );
  }

  /** Updates scrolled value if page is scrolled */
  @HostListener('document:scroll')
  onScroll({ scrollY: scrollPosition }: { scrollY: number } = window): void {
    const scrolled = scrollPosition > 235;
    if (scrolled !== this.scrolled) {
      this.scrolled = scrolled;
      this.cdr.markForCheck();
    }
  }

  /** Navigates to specified route */
  clicked(card: LongCard): void {
    this.router.navigate([card.route]);
  }

  /** Scrolls to the specified page element */
  scrollTo(id: string): void {
    this.router.navigate([], { fragment: id });
    this.scroller.scrollToAnchor(id);
  }
}
