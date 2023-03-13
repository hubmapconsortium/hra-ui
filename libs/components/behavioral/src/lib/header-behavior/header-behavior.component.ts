import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ftu-header-behavior',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-behavior.component.html',
  styleUrls: ['./header-behavior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderBehaviorComponent {}
