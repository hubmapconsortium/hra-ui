import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

export interface SnackbarData {
  message: string;
  action: string;
  close?: boolean;
}

@Component({
  selector: 'hra-snackbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarComponent {
  protected readonly snackbarRef = inject(MatSnackBarRef);
  protected readonly data: SnackbarData = inject(MAT_SNACK_BAR_DATA);
}
