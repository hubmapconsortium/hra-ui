import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ftu-ftu-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ftu-page.component.html',
  styleUrls: ['./ftu-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FtuPageComponent {}
