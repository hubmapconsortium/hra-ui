import { AfterViewInit, ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { Router } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';

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
 * Clickable navigation item in table of contents
 */
@Component({
  selector: 'hra-table-of-contents-item',
  templateUrl: './table-of-contents-item.component.html',
})
export class TableOfContentsItemComponent {
  /** Router service */
  readonly router = inject(Router);
  /** Section of item */
  readonly section = input.required<Section>();
  /** If the item is selected */
  readonly selected = input<boolean>(false);
  /** Base url */
  private readonly baseUrl = this.router.url.split('#')[0];

  /** If the item is selected */
  readonly isActive = computed<boolean>(() => {
    return this.router.url.split('#')[1] === this.section().anchor;
  });

  /** Href derived from base url and anchor */
  href(anchor: string) {
    return `${this.baseUrl}#${anchor}`;
  }
}

/**
 * Table of contents component for navigating between different sections on a page
 */
@Component({
  selector: 'hra-table-of-contents',
  templateUrl: './table-of-contents.component.html',
  styleUrl: './table-of-contents.component.scss',
  imports: [
    HraCommonModule,
    MatTreeModule,
    ButtonsModule,
    MatIconModule,
    ScrollingModule,
    TableOfContentsItemComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableOfContentsComponent implements AfterViewInit {
  /** Router service */
  readonly router = inject(Router);

  /** Text for the header portion */
  readonly tagline = input<string>('On this page');

  /** Sections data */
  readonly sections = input.required<Section[]>();

  /** Current selected node */
  readonly selectedNode = signal<Section | undefined>(undefined);

  /** Anchor id: position from top (px) */
  linkPositions: Record<string, number> = {};

  /**
   * Sets the selected node according to url and scrolls to initial anchor
   * If no anchor in url, starts at the top of the page
   * Listens to scroll events and sets the selected node based on the scroll position
   */
  ngAfterViewInit(): void {
    const linkList = Array.from(document.getElementsByTagName('hra-section-link')).filter((link) => link.id !== ''); // Get all section links on the page but exclude the header
    linkList.forEach((link) => {
      this.linkPositions[link.id] = link.getBoundingClientRect().top;
    });

    const urlAnchor = this.router.url.split('#')[1];
    const initialAnchor = urlAnchor ?? linkList[0].id;
    const initialNav = linkList.find((link) => link.id === initialAnchor);
    const initialSelectedSection = this.sections().find((section) => section.anchor === initialAnchor);

    this.selectedNode.set(initialSelectedSection);
    if (urlAnchor && initialNav) {
      initialNav.scrollIntoView();
    } else {
      window.scroll(0, 0);
    }

    document.addEventListener('scroll', () => {
      for (const [id, top] of Object.entries(this.linkPositions)) {
        if (window.scrollY >= top) {
          const newSelectedSection = this.sections().find((section) => section.anchor === id) || this.sections()[0];
          this.selectedNode.set(newSelectedSection);
        }
      }
    });
  }
}
