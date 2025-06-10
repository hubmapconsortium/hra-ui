import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationModule } from '@hra-ui/design-system/navigation';
import { DOCS_NAVIGATION_MENU } from '@hra-ui/design-system/navigation/site-navigation';

/**
 * Main application component
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
  /** Navigation menu for the application */
  protected readonly navigationMenu = DOCS_NAVIGATION_MENU;
}
