import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavigationModule } from '@hra-ui/design-system/navigation';

/**
 * Root component
 */
@Component({
  selector: 'ccf-root',
  imports: [RouterModule, NavigationModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    class: 'hra-app',
  },
})
export class AppComponent {
  /**
   * Initializes router and performs initial navigation
   */
  constructor() {
    inject(Router).initialNavigation();
  }
}
