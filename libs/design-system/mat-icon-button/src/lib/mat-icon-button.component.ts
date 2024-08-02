import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'hra-mat-icon-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './mat-icon-button.component.html',
  styleUrl: './mat-icon-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatIconButtonComponent {}
