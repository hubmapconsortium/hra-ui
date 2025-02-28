import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ErrorIndicatorComponent } from '@hra-ui/design-system/error-indicator';

@Component({
  selector: 'ccf-metadata-confirmation-dialog',
  imports: [MatDialogModule, MatIconModule, ButtonsModule, ErrorIndicatorComponent],
  templateUrl: './metadata-confirmation-dialog.component.html',
  styleUrls: ['./metadata-confirmation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataConfirmationDialogComponent {}
