import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, InjectionToken, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SvgIconNamespaceConfig, SvgIconNamespaceService } from '@hra-ui/cdk/icons';
import { findOrThrow } from '@hra-ui/common/array-util';
import { logos, namespaceConfigs } from './static-data/organ-logos.json';
import { OrganLogo, OrganLogoId } from './types/organ-logos.schema';

/** Typed logo items */
const LOGOS = logos as OrganLogo[];
/** Typed namespace configurations */
const NAMESPACE_CONFIGS = namespaceConfigs as SvgIconNamespaceConfig[];

/** Global initialization token */
const ORGAN_LOGOS_INITIALIZATION = new InjectionToken<void>('', {
  providedIn: 'root',
  factory: initializeOrganLogos,
});

/**
 * Configure the icon resolver to find organ logos
 */
function initializeOrganLogos(): void {
  inject(SvgIconNamespaceService).setNamespaceConfigs(NAMESPACE_CONFIGS);
}

/**
 * Get all available organ logo ids
 *
 * @returns An array of all available ids
 */
export function getOrganLogoIds(): OrganLogoId[] {
  return LOGOS.map(({ id }) => id);
}

/**
 * Convert a raw string id to a organ logo id
 *
 * @param id Raw id
 * @returns Typed organ logo id
 * @throws If the raw id is not a valid organ logo id
 */
export function toOrganLogoId(id: string): OrganLogoId {
  return findOrThrow(
    LOGOS,
    (item) => item.id === id,
    () => `'${id}' is not a valid organ logo id`,
  ).id;
}

/**
 * HRA organ logo
 */
@Component({
  selector: 'hra-organ-logo',
  imports: [CommonModule, MatIconModule],
  templateUrl: './organ-logo.component.html',
  styleUrl: './organ-logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganLogoComponent {
  /** Logo id */
  readonly id = input.required<OrganLogoId>();

  /** Logo data */
  protected readonly data = computed(() => findOrThrow(LOGOS, (item) => item.id === this.id()));

  /** Initialize the logo */
  constructor() {
    inject(ORGAN_LOGOS_INITIALIZATION);
  }
}
