import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hra-font-styles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './font-styles.component.html',
  styleUrl: './font-styles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FontStylesComponent {}
