import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { MatListModule } from '@angular/material/list';

/**
 * cdk panel list position
 */
const DOWNLOADS_LIST_POSITION: ConnectedPosition[] = [
  {
    panelClass: 'above',
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom',
    offsetY: 0,
  },
  {
    panelClass: 'below',
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
  },
];

@Component({
  selector: 'hra-footer',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatSelectModule, OverlayModule, MatListModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  /**
   * Host binding for class hra-footer
   */
  @HostBinding('class') readonly clsName = 'hra-footer';

  /**
   * Determines whether panel is open
   */
  isOpen = false;

  /**
   * Downloads list position
   */
  readonly DOWNLOADS_LIST_POSITION = DOWNLOADS_LIST_POSITION;

  /**
   * Contacts button action component
   */
  contactComponent() {
    //
  }
  /**
   * Download button action component
   */
  download() {
    //
  }
}
