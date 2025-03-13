import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationModule } from '@hra-ui/design-system/navigation';
import { isNavigating } from './utils/navigation';

/** Main application component */
@Component({
  selector: 'hra-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NavigationModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: {
    class: 'hra-app',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  /** is user navigating to a different page */
  protected readonly isNavigating = isNavigating();
}
