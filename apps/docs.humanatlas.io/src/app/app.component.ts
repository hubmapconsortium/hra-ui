import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseApplicationComponent } from '@hra-ui/application';
import { HraCommonModule } from '@hra-ui/common';

/**
 * Main application component for docs
 */
@Component({
  selector: 'hra-docs',
  imports: [HraCommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: {
    class: 'hra-app',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent extends BaseApplicationComponent {
  /** Initialize the application */
  constructor() {
    super();
  }
}
