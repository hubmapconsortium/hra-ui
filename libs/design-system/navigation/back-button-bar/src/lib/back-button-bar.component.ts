import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

/** Back bar component used when an application is embedded */
@Component({
  selector: 'hra-back-button-bar',
  imports: [MatCommonModule, MatIconModule, ButtonsModule],
  templateUrl: './back-button-bar.component.html',
  styleUrl: './back-button-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackButtonBarComponent {
  /** Emits when the back button is clicked */
  readonly backClick = output<void>();
}
