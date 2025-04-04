import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, InjectionToken, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SvgIconNamespaceConfig, SvgIconNamespaceService } from '@hra-ui/cdk/icons';
import { findOrThrow } from '@hra-ui/common/array-util';
import { logos, namespaceConfigs } from './static-data/product-logos.json';
import { ProductLogo, ProductLogoId } from './types/product-logos.schema';

/** Typed logo items */
const LOGOS = logos as ProductLogo[];
/** Typed namespace configurations */
const NAMESPACE_CONFIGS = namespaceConfigs as SvgIconNamespaceConfig[];

/** Global initialization token */
const PRODUCT_LOGOS_INITIALIZATION = new InjectionToken<void>('', {
  providedIn: 'root',
  factory: initializeProductLogos,
});

/**
 * Configure the icon resolver to find product logos
 */
function initializeProductLogos(): void {
  inject(SvgIconNamespaceService).setNamespaceConfigs(NAMESPACE_CONFIGS);
}

/**
 * Get all available product logo ids
 *
 * @returns An array of all available ids
 */
export function getProductLogoIds(): ProductLogoId[] {
  return LOGOS.map(({ id }) => id);
}

/**
 * Convert a raw string id to a product logo id
 *
 * @param id Raw id
 * @returns Typed product logo id
 * @throws If the raw id is not a valid product logo id
 */
export function toProductLogoId(id: string): ProductLogoId {
  return findOrThrow(
    LOGOS,
    (item) => item.id === id,
    () => `'${id}' is not a valid product logo id`,
  ).id;
}

/**
 * HRA product logo
 */
@Component({
  selector: 'hra-product-logo',
  imports: [CommonModule, MatIconModule],
  templateUrl: './product-logo.component.html',
  styleUrl: './product-logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductLogoComponent {
  /** Logo id */
  readonly id = input.required<ProductLogoId>();

  /** Logo data */
  protected readonly data = computed(() => findOrThrow(LOGOS, (item) => item.id === this.id()));

  /** Initialize the logo */
  constructor() {
    inject(PRODUCT_LOGOS_INITIALIZATION);
  }
}
