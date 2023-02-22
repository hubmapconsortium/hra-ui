import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'hra-info-modal',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatButtonModule, MatIconModule],
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoModalComponent {
  /** HTML Class Name */
  @HostBinding('class') readonly clsName = 'hra-info-modal';

  /**
   * value to display.
   */
  @Input() value!: string;

  /** Emitted when the close icon is clicked */
  @Output() readonly clsoeIconClick = new EventEmitter<void>();
}
