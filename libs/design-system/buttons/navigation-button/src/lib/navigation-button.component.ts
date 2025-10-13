import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';

@Component({
  selector: 'hra-navigation-button',
  imports: [HraCommonModule],
  templateUrl: './navigation-button.component.html',
  styleUrl: './navigation-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationButtonComponent {}
