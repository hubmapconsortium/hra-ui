import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'hra-navigation-category-toggle',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule, MatIconModule],
  templateUrl: './navigation-category-toggle.component.html',
  styleUrl: './navigation-category-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationCategoryToggleComponent {
  readonly toggled = model(false);
}
