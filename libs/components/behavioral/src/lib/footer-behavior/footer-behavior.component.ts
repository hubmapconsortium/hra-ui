import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { ResourceRegistrySelectors as RR } from '@hra-ui/cdk/state';
import { FooterComponent } from '@hra-ui/components/molecules';
import { ResourceIds as Ids } from '@hra-ui/state';

import { ContactBehaviorComponent } from '../contact-behavior/contact-behavior.component';

@Component({
  selector: 'ftu-footer-behavior',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FooterComponent, ContactBehaviorComponent],
  templateUrl: './footer-behavior.component.html',
  styleUrls: ['./footer-behavior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterBehaviorComponent {
  /** Input for product logo URL to displayed on the left side. */
  readonly productLogoUrl = selectQuerySnapshot(RR.url, Ids.ProductLogoUrl);

  /** Input for product title to displayed on the left side. */
  readonly productTitle = selectQuerySnapshot(RR.anyText, Ids.ProductTitle);

  /** A dialog box which shows contact modal after clicking on contact */
  private readonly dialog = inject(MatDialog);

  /** The current document object. */
  private readonly document = inject(DOCUMENT);

  /** A function which opens the contact modal dialog box */
  contact(): void {
    this.dialog.open(ContactBehaviorComponent);
  }

  /** A function which redirects the user to a new URL */
  goToUrl(): void {
    this.document.location.href = 'https://example.com';
  }
}
