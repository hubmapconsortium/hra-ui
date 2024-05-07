import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hra-ui-webcomponents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './webcomponents.component.html',
  styleUrl: './webcomponents.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebcomponentsComponent {}
