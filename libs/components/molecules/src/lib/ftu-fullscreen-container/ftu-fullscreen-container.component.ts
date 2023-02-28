import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hra-ftu-fullscreen-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ftu-fullscreen-container.component.html',
  styleUrls: ['./ftu-fullscreen-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FtuFullscreenContainerComponent {}
