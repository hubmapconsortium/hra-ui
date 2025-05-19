import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Directive,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { registerStyleComponents } from '@hra-ui/cdk/styling';
import { SvgIconNamespaceService } from '../../svg-icons/namespace.service';

/** Global styles for filled icon */
@Component({
  selector: 'hra-filled-icon-styles',
  standalone: true,
  template: '',
  styleUrls: ['./filled-icon.directive.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilledIconStylesComponent {}

/**
 * Directive for filled icon
 */
@Directive({
  selector: '[hraFilledIcon]',
  standalone: true,
  host: {
    '[class.hra-filled-icon]': 'iconColor_() !== null || fillColor_() !== null',
    '[style.--hra-filled-icon-color]': 'iconColor_()',
    '[style.--hra-filled-icon-fill-color]': 'fillColor_()',
  },
})
export class FilledIconDirective {
  /** Color of the icon */
  readonly iconColor = input<string>();
  /** Fill color of the icon */
  readonly fillColor = input<string>();
  /** Color of the icon from config*/
  protected readonly iconColor_ = computed(() => this.iconColor() || this.getConfigValue('color'));
  /** Fill color of the icon from config*/
  protected readonly fillColor_ = computed(() => this.fillColor() || this.getConfigValue('fillColor'));
  /** Get icon from mat icon*/
  private readonly iconComponent = inject(MatIcon);
  /** Get icon namespace service */
  private readonly configService = inject(SvgIconNamespaceService);

  /** Initialize styles */
  constructor() {
    registerStyleComponents([FilledIconStylesComponent]);
  }

  /**
   * Get the value of a config key for the current icon namespace
   *
   * @param key Config key
   * @returns Config value or null if not found
   */
  private getConfigValue(key: string): string | null {
    const namespace = (this.iconComponent.svgIcon ?? '').split(':')[0];
    const config = this.configService.getNamespaceConfig(namespace);
    return (config?.[key] as string | undefined) ?? null;
  }
}
