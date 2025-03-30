import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, input, signal } from '@angular/core';

import { NavigationItemComponent } from './navigation-item.component';

/** Nested section item */
export interface Section {
  /** Name of section */
  name: string;
  /** List of child sections */
  children?: Section[];
}

/**
 * Page navigation component for navigating between different sections on a page
 */
@Component({
  selector: 'hra-page-navigation',
  imports: [CommonModule, NavigationItemComponent],
  templateUrl: './page-navigation.component.html',
  styleUrl: './page-navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNavigationComponent {
  /** Text for the header portion */
  readonly tagline = input<string>('On this page');
  /** Section list */
  readonly sections = input<Section[]>([]);
  /** Current selected section */
  readonly currentItem = signal<Section | undefined>(undefined);

  /**
   * Set the initial item
   */
  constructor() {
    effect(() => {
      const sectionName = window.location.hash.replaceAll('-', ' ').replace('#', '');
      const initialSection = this.flattenTree(this.sections()).find(
        (section) => section.name.toLowerCase() === sectionName.toLowerCase(),
      );
      this.currentItem.set(initialSection);
    });
  }

  /**
   * Flattens tree of sections
   * @param tree Nested section tree
   * @returns Flattened section tree
   */
  private flattenTree(tree: Section[]): Section[] {
    let result: Section[] = [];
    tree.forEach((node) => {
      result.push({ name: node.name, children: node.children });
      if (node.children) {
        result = result.concat(this.flattenTree(node.children));
      }
    });
    return result;
  }
}
