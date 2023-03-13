import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@hra-ui/components/molecules';

@Component({
  selector: 'ftu-header-behavior',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './header-behavior.component.html',
  styleUrls: ['./header-behavior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderBehaviorComponent {
  /**
   * Input for product logo URL to displayed on the left side.
   */
  @Input() productLogoUrl = '';

  /**
   * Input for product title to displayed on the left side.
   */
  @Input() productTitle = '';

  /**
   * Input for app title to show on the left side.
   */
  @Input() appTitle = '';
}
