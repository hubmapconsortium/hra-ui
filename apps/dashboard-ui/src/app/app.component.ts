import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavigationModule } from '@hra-ui/design-system/navigation';

/**
 * App Component
 */
@Component({
  selector: 'hra-root',
  imports: [RouterModule, NavigationModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: {
    class: 'hra-app',
  },
})
export class AppComponent {
  /** Initialize app */
  constructor() {
    inject(Router).initialNavigation();
  }
}
