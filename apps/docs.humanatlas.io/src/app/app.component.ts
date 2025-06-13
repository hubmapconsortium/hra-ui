import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationModule } from '@hra-ui/design-system/navigation';
import { CtaConfig } from '@hra-ui/design-system/navigation/header';

/**
 * Main application component for docs
 */
@Component({
  selector: 'hra-docs',
  imports: [RouterModule, NavigationModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: {
    class: 'hra-app',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  /** Call to action message */
  protected readonly cta: CtaConfig = {
    description: '🎉  9th Release (v2.3) has arrived!',
    action: 'Learn more',
    url: 'https://humanatlas.io/release-notes/v2.3',
  };
}
