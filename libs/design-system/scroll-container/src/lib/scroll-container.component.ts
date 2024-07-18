import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hra-scroll-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-container.component.html',
  styleUrl: './scroll-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollContainerComponent {}
