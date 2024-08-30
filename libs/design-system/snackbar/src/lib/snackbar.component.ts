import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { ButtonModule } from '@hra-ui/design-system/button';

export interface SnackbarData {
  message: string;
  action: string;
  close?: boolean;
}

@Component({
  selector: 'hra-snackbar',
  standalone: true,
  imports: [CommonModule, MatIconModule, ButtonModule],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarComponent {
  protected readonly snackbarRef = inject(MatSnackBarRef);
  protected readonly data: SnackbarData = inject(MAT_SNACK_BAR_DATA);
}
