import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

/** Product name type */
export type ProductName =
  | '3d_organ_models'
  | 'api'
  | 'app_library'
  | 'asctb_reporter'
  | 'cde'
  | 'cell_population_graphs'
  | 'cpp'
  | 'dashboards'
  | 'design_system'
  | 'dev_portal'
  | 'eui'
  | 'ftu'
  | 'human_atlas_stories'
  | 'millitome'
  | 'omaps'
  | 'organ_gallery'
  | 'rui'
  | 'top'
  | 'vccf'
  | 'web_components';
/** Button size type */
export type ProductLogoSize = 'small' | 'large';

/**
 * HRA product logos
 */
@Component({
  selector: 'hra-product-logo',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './product-logo.component.html',
  styleUrl: './product-logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductLogoComponent {
  /** Button name */
  readonly name = input.required<ProductName>();

  /** Button size */
  readonly size = input.required<ProductLogoSize>();

  /** Icon to display */
  protected icon = computed(() => `products:${this.name()}${this.size() === 'large' ? '_large' : ''}`);
}
