import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconButtonSizeDirective } from '@hra-ui/design-system/icon-button';

/** Interface for Dialog Data */
export interface DialogData {
  /** Title of the dialog */
  title: string;
  /** Message of the dialog */
  message: string;
  /** Action Button Object */
  action?: {
    /** Label for the action button */
    label: string;
    /** Callback function for the action button */
    callback: () => void;
  };
}

/** Notice Component */
@Component({
  selector: 'hra-notice',
  standalone: true,
  imports: [
    CommonModule,
    IconButtonSizeDirective,
    MatIconModule,
    ButtonsModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    MatDialogClose,
  ],
  templateUrl: './notice.component.html',
  styleUrl: './notice.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoticeComponent {
  /** Instance of Mat Dialog Data */
  protected readonly data: DialogData = inject(MAT_DIALOG_DATA);
}
