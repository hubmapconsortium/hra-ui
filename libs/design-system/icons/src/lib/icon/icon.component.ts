import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IconConfigRegistryService } from '../services/icon-config.service';

@Component({
  selector: 'hra-icon',
  imports: [CommonModule, MatIconModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.hra-icon-filled]': '!!svgConfig?.backgroundColor',
    '[style.color]': 'svgConfig?.color || null',
    '[style.background-color]': 'svgConfig?.backgroundColor || null',
  },
})
export class IconComponent {
  readonly svgIcon = input('');
  readonly fontIcon = input('');
  readonly fontSet = input('');
  readonly inline = input(false, { transform: booleanAttribute });

  protected readonly svgConfig = computed(() => {
    const icon = this.svgIcon();
    return icon ? this.configRegistry.getIconConfig(icon) : undefined;
  });

  private readonly configRegistry = inject(IconConfigRegistryService);
}
