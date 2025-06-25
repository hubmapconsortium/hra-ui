import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationModule } from '@hra-ui/design-system/navigation';

import { FilterMenuComponent } from '../components/filter-menu/filter-menu.component';

/**
 * Main application component
 */
@Component({
  imports: [RouterModule, NavigationModule, FilterMenuComponent],
  selector: 'hra-kg-explorer-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
  host: {
    class: 'hra-app',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
