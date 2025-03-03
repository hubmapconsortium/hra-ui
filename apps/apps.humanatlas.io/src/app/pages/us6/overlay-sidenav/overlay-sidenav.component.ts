import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { EmbedSidenavContentComponent } from '../embed-sidenav-content/embed-sidenav-content.component';

@Component({
  selector: 'hra-overlay-sidenav',
  standalone: true,
  imports: [CommonModule, EmbedSidenavContentComponent, OverlayModule],
  templateUrl: './overlay-sidenav.component.html',
  styleUrl: './overlay-sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverlaySidenavComponent {
  readonly isOpen = input.required<boolean>();
  readonly tagline = input.required<string>();
  readonly code = input.required<string>();
  readonly showApp = input.required<boolean>();
  readonly tabIndex = input.required<number>();
  readonly close = output<void>();
}
