import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hra-ftu-fullscreen-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ftu-fullscreen-content.component.html',
  styleUrls: ['./ftu-fullscreen-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FtuFullscreenContentComponent {}
