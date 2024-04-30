import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CdeVisualizationComponent } from '@hra-ui/cde-visualization';

/**
 * Landing page component
 */
@Component({
  selector: 'cde-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink, CdeVisualizationComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {}
