import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FullscreenContainerComponent, FullscreenContentComponent } from '@hra-ui/components/molecules';

@Component({
  selector: 'ftu-ftu-page',
  standalone: true,
  imports: [CommonModule, FullscreenContainerComponent, FullscreenContentComponent],
  templateUrl: './ftu.component.html',
  styleUrls: ['./ftu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FtuComponent {}
