import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductLogoComponent } from '@hra-ui/design-system/product-logo';
import { SoftwareStatusIndicatorComponent } from '@hra-ui/design-system/software-status-indicator';

@Component({
  selector: 'hra-web-components',
  standalone: true,
  imports: [CommonModule, ProductLogoComponent, SoftwareStatusIndicatorComponent],
  templateUrl: './web-components.component.html',
  styleUrl: './web-components.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebComponentsComponent {}
