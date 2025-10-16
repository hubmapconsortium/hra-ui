import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';

/** Navigation toggle button */
@Component({
  selector: 'hra-navigation-category-toggle',
  imports: [HraCommonModule, MatButtonToggleModule, MatIconModule],
  templateUrl: './navigation-category-toggle.component.html',
  styleUrl: './navigation-category-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationCategoryToggleComponent {
  /** Whether the button is toggled on/off */
  readonly toggled = model(false);
}
