import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IconConfigRegistryService } from '../services/icon-config.service';
import { IconData } from '../types/icon.schema';

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
  readonly icon = input<IconData>();
  readonly svgIcon = input<string>();
  readonly fontIcon = input<string>();
  readonly fontSet = input<string>();
  readonly inline = input(undefined, { transform: booleanAttribute });

  protected readonly svgIcon_ = this.selectValue('svgIcon', '');
  protected readonly fontIcon_ = this.selectValue('fontIcon', '');
  protected readonly fontSet_ = this.selectValue('fontSet', '');
  protected readonly inline_ = this.selectValue('inline', false);

  protected readonly svgConfig = computed(() => {
    const icon = this.svgIcon_();
    return icon ? this.configRegistry.getIconConfig(icon) : undefined;
  });

  private readonly configRegistry = inject(IconConfigRegistryService);

  private selectValue<K extends keyof IconData>(
    key: K,
    defaultValue: NonNullable<IconData[K]>,
  ): Signal<NonNullable<IconData[K]>> {
    return computed(() => (this[key]() || this.icon()?.[key] || defaultValue) as NonNullable<IconData[K]>);
  }
}
