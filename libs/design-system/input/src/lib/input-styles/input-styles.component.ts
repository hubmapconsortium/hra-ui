import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Applies input styles globally
 */
@Component({
  selector: 'hra-input-styles',
  imports: [CommonModule],
  template: '',
  styleUrl: './input-styles.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputStylesComponent {}
