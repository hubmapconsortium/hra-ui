import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from '@hra-ui/design-system/button';

/** Back bar component used when an application is embedded */
@Component({
  selector: 'hra-back-bar',
  standalone: true,
  imports: [MatIconModule, ButtonModule],
  templateUrl: './back-bar.component.html',
  styleUrl: './back-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackBarComponent {
  /** Emits when the back button is clicked */
  readonly backClick = output<void>();
}
