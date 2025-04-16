import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
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
export class AppComponent {}
