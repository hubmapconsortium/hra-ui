import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';

const DOWNLOADS_LIST_POSITION: ConnectedPosition[] = [
  {
    panelClass: 'above', //download list panel
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom',
    offsetY: 1,
  },
];

@Component({
  selector: 'hra-footer',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatSelectModule, OverlayModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  isOpen = false;
  hasBackdrop = false;

  readonly DOWNLOADS_LIST_POSITION = DOWNLOADS_LIST_POSITION;

  contactComponent() {
    //
  }
}
