import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IconConfigRegistryService } from '../services/icon-config.service';
import { IconData } from '../types/icon.schema';

/**
 * Design system icon.
 * Wraps mat-icon to provide additional functionality.
 */
@Component({
  selector: 'hra-icon',
  imports: [CommonModule, MatIconModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.hra-icon-filled]': '!!svgConfig()?.backgroundColor',
    '[style.color]': 'svgConfig()?.color || null',
    '[style.background-color]': 'svgConfig()?.backgroundColor || null',
  },
})
export class IconComponent {
  /** Data packed into an `IconData` object */
  readonly icon = input<IconData>();
  /** Svg icon in format `[namespace:]name` */
  readonly svgIcon = input<string>();
  /** Font icon name */
  readonly fontIcon = input<string>();
  /** Font icon set */
  readonly fontSet = input<string>();
  /** Whether the icon should inherit it's size from the containing context */
  readonly inline = input(undefined, { transform: booleanAttribute });

  /** Resolved svg icon */
  protected readonly svgIcon_ = this.selectValue('svgIcon', '');
  /** Resolved font icon */
  protected readonly fontIcon_ = this.selectValue('fontIcon', '');
  /** Resolved font set */
  protected readonly fontSet_ = this.selectValue('fontSet', '');
  /** Resolved inline */
  protected readonly inline_ = this.selectValue('inline', false);

  /** Icon configuration from the configuration service */
  protected readonly svgConfig = computed(() => {
    const icon = this.svgIcon_();
    return icon ? this.configRegistry.getIconConfig(icon) : undefined;
  });

  /** Configuration registry */
  private readonly configRegistry = inject(IconConfigRegistryService);

  /**
   * Resolves an input value based on both the input signal and the packed `icon` input data.
   *
   * @param key Icon data key
   * @param defaultValue Default value
   * @returns A signal containing the resolved value for the key
   */
  private selectValue<K extends keyof IconData>(
    key: K,
    defaultValue: NonNullable<IconData[K]>,
  ): Signal<NonNullable<IconData[K]>> {
    return computed(() => (this[key]() || this.icon()?.[key] || defaultValue) as NonNullable<IconData[K]>);
  }
}
