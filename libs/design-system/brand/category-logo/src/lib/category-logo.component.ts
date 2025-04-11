import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, InjectionToken, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SvgIconNamespaceConfig, SvgIconNamespaceService } from '@hra-ui/cdk/icons';
import { findOrThrow } from '@hra-ui/common/array-util';
import { logos, namespaceConfigs } from './static-data/category-logos.json';
import { CategoryLogo, CategoryLogoId } from './types/category-logos.schema';

/** Typed logo items */
const LOGOS = logos as CategoryLogo[];
/** Typed namespace configurations */
const NAMESPACE_CONFIGS = namespaceConfigs as SvgIconNamespaceConfig[];

/** Global initialization token */
const CATEGORY_LOGOS_INITIALIZATION = new InjectionToken<void>('', {
  providedIn: 'root',
  factory: initializeCategoryLogos,
});

/**
 * Configure the icon resolver to find category logos
 */
function initializeCategoryLogos(): void {
  inject(SvgIconNamespaceService).setNamespaceConfigs(NAMESPACE_CONFIGS);
}

/**
 * Get all available category logo ids
 *
 * @returns An array of all available ids
 */
export function getCategoryLogoIds(): CategoryLogoId[] {
  return LOGOS.map(({ id }) => id);
}

/**
 * Convert a raw string id to a category logo id
 *
 * @param id Raw id
 * @returns Typed category logo id
 * @throws If the raw id is not a valid category logo id
 */
export function toCategoryLogoId(id: string): CategoryLogoId {
  return findOrThrow(
    LOGOS,
    (item) => item.id === id,
    () => `'${id}' is not a valid category logo id`,
  ).id;
}

/**
 * HRA category logo
 */
@Component({
  selector: 'hra-category-logo',
  imports: [CommonModule, MatIconModule],
  templateUrl: './category-logo.component.html',
  styleUrl: './category-logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryLogoComponent {
  /** Logo id */
  readonly id = input.required<CategoryLogoId>();

  /** Logo data */
  protected readonly data = computed(() => findOrThrow(LOGOS, (item) => item.id === this.id()));

  /** Initialize the logo */
  constructor() {
    inject(CATEGORY_LOGOS_INITIALIZATION);
  }
}
