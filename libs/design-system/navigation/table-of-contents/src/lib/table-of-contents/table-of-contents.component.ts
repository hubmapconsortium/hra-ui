import { AfterViewInit, ChangeDetectionStrategy, Component, inject, input, linkedSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { Router } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';

import { ItemComponent } from './item/item.component';

/** Nested section item */
export interface Section {
  /** Name of section */
  label: string;
  /** Anchor for href */
  anchor: string;
  /** Level of section item */
  level: number;
}

/**
 * Table of contents component for navigating between different sections on a page
 */
@Component({
  selector: 'hra-table-of-contents',
  templateUrl: './table-of-contents.component.html',
  styleUrl: './table-of-contents.component.scss',
  imports: [HraCommonModule, MatTreeModule, ButtonsModule, MatIconModule, ScrollingModule, ItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:scroll)': 'onScroll()',
  },
})
export class TableOfContentsComponent implements AfterViewInit {
  /** Router service */
  readonly router = inject(Router);

  /** Sections data */
  readonly sections = input.required<Section[]>();

  /** Text for the header portion */
  readonly tagline = input('On this page');

  /** Router service */
  // private readonly fragment = injectRouteFragment();

  protected readonly baseUrl = this.router.url.split('#')[0];

  /** Current active section */
  protected readonly activeSection = linkedSignal(() => {
    // const fragment = this.fragment()?.slice(1);
    const fragment = '';
    const section = this.sections().find((s) => s.anchor === fragment);
    return section ?? this.sections()[0];
  });

  /** Anchor id: position from top (px) */
  linkPositions: Record<string, number> = {};

  /**
   * Sets the selected node according to url and scrolls to initial anchor
   * If no anchor in url, starts at the top of the page
   * Listens to scroll events and sets the selected node based on the scroll position
   */
  ngAfterViewInit(): void {
    this.activeSection();
    const linkList = Array.from(document.getElementsByTagName('hra-section-link')).filter((link) => link.id !== ''); // Get all section links on the page but exclude the header
    linkList.forEach((link) => {
      this.linkPositions[link.id] = link.getBoundingClientRect().top;
    });

    const urlAnchor = this.router.url.split('#')[1];
    const initialAnchor = urlAnchor ?? linkList[0].id;
    const initialNav = linkList.find((link) => link.id === initialAnchor);
    const initialSelectedSection =
      this.sections().find((section) => section.anchor === initialAnchor) || this.sections()[0];
    this.activeSection.set(initialSelectedSection);

    if (urlAnchor && initialNav) {
      initialNav.scrollIntoView();
    } else {
      window.scroll(0, 0);
    }
  }

  /**
   * Updates selection on scroll
   */
  onScroll(): void {
    for (const [id, top] of Object.entries(this.linkPositions)) {
      if (window.scrollY >= top) {
        const newSelectedSection = this.sections().find((section) => section.anchor === id) || this.sections()[0];
        this.activeSection.set(newSelectedSection);
      }
    }
  }
}
