import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';

/**
 * Main application component
 */
@Component({
  imports: [HraCommonModule, RouterModule],
  selector: 'cns-website',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: {
    class: 'cns-website',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
