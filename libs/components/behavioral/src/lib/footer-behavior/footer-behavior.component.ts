import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { dispatch, selectQuerySnapshot, selectSnapshot } from '@hra-ui/cdk/injectors';
import { ResourceRegistrySelectors as RR } from '@hra-ui/cdk/state';
import { FooterComponent } from '@hra-ui/components/molecules';
import { DownloadActions, DownloadSelectors, ResourceIds as Ids, LinkIds } from '@hra-ui/state';

import { ContactBehaviorComponent } from '../contact-behavior/contact-behavior.component';

/** A component for footer behavior which provides functionality for various buttons in footer */
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

  /** Hra portal link routing after clicking on HRA Portal */
  readonly hraPortal = LinkIds.Portal;

  /** Metadata page link routing after clicking on Illustration */
  readonly illustrationMetadata = LinkIds.Illustration;

  /** Embed link routing after clicking on Embed */
  readonly embed = LinkIds.Embed;

  /** A dialog box which shows contact modal after clicking on contact */
  private readonly dialog = inject(MatDialog);

  /** A dispatcher function to download file in specified format */
  readonly download = dispatch(DownloadActions.Download);

  /** Selects a snapshot of the current value of the available download formats */
  readonly downloadFormat = selectSnapshot(DownloadSelectors.formats);

  /** A function which opens the contact modal dialog box */
  contact(): void {
    this.dialog.open(ContactBehaviorComponent);
  }
}
