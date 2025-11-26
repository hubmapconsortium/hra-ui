import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseApplicationComponent } from '@hra-ui/application';
import { HraCommonModule } from '@hra-ui/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

/**
 * Main application component
 */
@Component({
  selector: 'cns-website',
  imports: [HraCommonModule, RouterModule, HeaderComponent, FooterComponent],
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
  }
}
