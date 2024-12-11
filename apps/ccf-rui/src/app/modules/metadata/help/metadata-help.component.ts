import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonModule } from '@hra-ui/design-system/button';

@Component({
  selector: 'ccf-metadata-help',
  standalone: true,
  imports: [MatDividerModule, MatIconModule, MatMenuModule, ButtonModule],
  templateUrl: './metadata-help.component.html',
  styleUrls: ['./metadata-help.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataHelpComponent {}
