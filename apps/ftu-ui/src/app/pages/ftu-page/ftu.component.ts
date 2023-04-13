import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderBehaviorComponent } from '@hra-ui/components/behavioral';

@Component({
  selector: 'ftu-ftu-page',
  standalone: true,
  imports: [CommonModule, HeaderBehaviorComponent],
  templateUrl: './ftu.component.html',
  styleUrls: ['./ftu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FtuComponent {}
