import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from '@hra-ui/design-system/button';
import { ErrorIndicatorComponent } from '@hra-ui/design-system/error-indicator';

@Component({
  selector: 'ccf-metadata-confirmation-dialog',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, ButtonModule, ErrorIndicatorComponent],
  templateUrl: './metadata-confirmation-dialog.component.html',
  styleUrls: ['./metadata-confirmation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataConfirmationDialogComponent {}
