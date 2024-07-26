import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';

@Component({
  selector: 'hra-logo',
  standalone: true,
  imports: [CommonModule, AssetUrlPipe],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
  /** Defines an input property for the home link */
  readonly homeLink = input<string>();

  readonly app = input<string>();

  readonly size = input<string>();
}
