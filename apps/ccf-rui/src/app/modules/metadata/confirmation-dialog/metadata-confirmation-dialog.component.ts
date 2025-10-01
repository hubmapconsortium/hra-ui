import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ErrorIndicatorComponent } from '@hra-ui/design-system/indicators/error-indicator';

/**
 * Dialog for user to confirm metadata updates
 */
@Component({
  selector: 'ccf-metadata-confirmation-dialog',
  imports: [HraCommonModule, MatDialogModule, MatIconModule, ButtonsModule, ErrorIndicatorComponent],
  templateUrl: './metadata-confirmation-dialog.component.html',
  styleUrls: ['./metadata-confirmation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataConfirmationDialogComponent {}
