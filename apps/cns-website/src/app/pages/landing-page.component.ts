import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { HeaderComponent } from '../components/header/header.component';

/**
 * Landing page of CNS website
 */
@Component({
  selector: 'cns-landing-page',
  imports: [HraCommonModule, HeaderComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {}
