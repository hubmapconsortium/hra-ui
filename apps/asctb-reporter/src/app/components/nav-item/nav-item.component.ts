import { Component, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';

@Component({
  selector: 'app-nav-item',
  imports: [HraCommonModule],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss',
})
export class NavItemComponent {
  /** Label for the navigation item */
  readonly label = input<string>('');

  /** Whether the navigation item is disabled */
  readonly disabled = input<boolean>(false);
}
