import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

@Component({
  selector: 'ccf-metadata-help',
  standalone: true,
  imports: [MatDividerModule, MatIconModule, MatMenuModule, ButtonsModule],
  templateUrl: './metadata-help.component.html',
  styleUrls: ['./metadata-help.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataHelpComponent {}
