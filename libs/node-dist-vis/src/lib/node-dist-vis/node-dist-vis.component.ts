import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hra-node-dist-vis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './node-dist-vis.component.html',
  styleUrl: './node-dist-vis.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeDistVisComponent {}
