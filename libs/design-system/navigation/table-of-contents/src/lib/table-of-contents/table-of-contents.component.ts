import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
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
export class TableOfContentsComponent {
  /** Text for the header portion */
  readonly tagline = input<string>('On this page');

  /** Sections data */
  readonly sections = input.required<Section[]>();

  /** Current selected node */
  selectedNode?: Section;
}
