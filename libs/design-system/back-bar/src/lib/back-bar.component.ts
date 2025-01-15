import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from '@hra-ui/design-system/button';

@Component({
  selector: 'hra-back-bar',
  standalone: true,
  imports: [MatIconModule, ButtonModule],
  templateUrl: './back-bar.component.html',
  styleUrl: './back-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackBarComponent {
  readonly backClick = output<void>();
}
