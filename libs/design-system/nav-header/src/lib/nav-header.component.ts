import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLogosComponent, AppLogosVariant } from '../../../logos/apps/src/index';
import { MatIconModule } from '@angular/material/icon';

/**
 * Interface for Navigation Header
 */
export interface NavInfo {
  /** Variant of the header */
  variant?: AppLogosVariant;
  /** Link to the app */
  link: string;
  /** Icon for the app */
  icon: string;
  /** Name of the app */
  title: string;
  /** Desctiption of the app */
  description?: string;
}

/**
 * Navigation Header Component
 */
@Component({
  selector: 'hra-nav-header',
  standalone: true,
  imports: [CommonModule, AppLogosComponent, MatIconModule],
  templateUrl: './nav-header.component.html',
  styleUrl: './nav-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavHeaderComponent {
  /** Header details for navigation header */
  navInfo = input.required<NavInfo>();
}
