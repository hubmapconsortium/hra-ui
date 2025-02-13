import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

/** Navigation toggle button */
@Component({
  selector: 'hra-navigation-category-toggle',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule, MatIconModule],
  templateUrl: './navigation-category-toggle.component.html',
  styleUrl: './navigation-category-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationCategoryToggleComponent {
  /** Whether the button is toggled on/off */
  readonly toggled = model(false);
}
