import { ViewportScroller } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LongCard } from '../card-button-long/long-card';
import { PageDef } from './page-def';

/** Renders a component according to it's type */
@Component({
  selector: 'page-element',
  templateUrl: './page-element.component.html',
  styleUrls: ['./page-element.component.scss'],
})
export class PageElementComponent implements OnInit {
  /** Details of element to be displayed */
  @Input() def: PageDef;

  /** Subscriptions managed by this component. */
  private subscriptions = new Subscription();

  /** Flag to check if page is scrolled */
  scrolled: boolean = false;

  /** Creates instance of Router, ActivatedRoute, ViewportScroller
   * and navigates to page element if fragment is changed */
  constructor(
    private router: Router,
    private readonly route: ActivatedRoute,
    private scroller: ViewportScroller,
  ) {
    this.subscriptions.add(
      this.route.fragment.subscribe((anchor) => {
        if (anchor) {
          this.scroller.scrollToAnchor(anchor);
        }
      }),
    );
  }

  /** Updates scrolled value if page is scrolled */
  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.pageYOffset;
      if (scrollPosition > 220) {
        this.scrolled = true;
      } else {
        this.scrolled = false;
      }
    });
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
