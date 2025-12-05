import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BaseApplicationComponent } from '@hra-ui/application';
import { HraCommonModule } from '@hra-ui/common';
import { CustomScrollService } from '@hra-ui/common/custom-scroll';
import { HeaderComponent } from './components/header/header.component';

/**
 * Main application component
 */
@Component({
  selector: 'cns-website',
  imports: [HraCommonModule, RouterModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'cns-website',
  },
})
export class AppComponent extends BaseApplicationComponent {
  /** Initialize application */
  constructor() {
    super();

    inject(CustomScrollService);
    inject(ViewportScroller).setOffset([0, 56 + 24]);
    inject(Router).initialNavigation();
  }
}
