import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from '@hra-ui/design-system/button';

/** Back bar component used when an application is embedded */
@Component({
  selector: 'hra-back-button-bar',
  standalone: true,
  imports: [MatCommonModule, MatIconModule, ButtonModule],
  templateUrl: './back-button-bar.component.html',
  styleUrl: './back-button-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackButtonBarComponent {
  /** Emits when the back button is clicked */
  readonly backClick = output<void>();
}
