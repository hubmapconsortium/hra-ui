import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from '@hra-ui/design-system/button';
import { BreadcrumbsSizeDirective } from '../breadcrumbs-size/breadcrumbs-size.directive';

@Component({
  selector: 'hra-breadcrumbs-demo',
  standalone: true,
  imports: [CommonModule, MatIconModule, ButtonModule, BreadcrumbsSizeDirective],
  templateUrl: './breadcrumbs-demo.component.html',
  styleUrl: './breadcrumbs-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsDemoComponent {}
