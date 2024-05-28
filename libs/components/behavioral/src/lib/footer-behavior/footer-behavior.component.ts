import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { dispatch, selectQuerySnapshot, selectSnapshot } from '@hra-ui/cdk/injectors';
import { ResourceRegistrySelectors as RR } from '@hra-ui/cdk/state';
import { FooterComponent } from '@hra-ui/components/molecules';
import { DownloadActions, DownloadSelectors, ResourceIds as Ids, LinkIds, ScreenModeSelectors } from '@hra-ui/state';

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

  /** Selects a snapshot of the current value of the available download formats */
  readonly downloadFormats = selectSnapshot(DownloadSelectors.formats);

  /** Hra portal link routing after clicking on HRA Portal */
  readonly hraPortal = LinkIds.Portal;

  /** Metadata page link routing after clicking on Illustration */
  readonly illustrationMetadata = LinkIds.Illustration;

  /** Input for about link for user click action. */
  readonly aboutLink = LinkIds.About;

  /** Embed link routing after clicking on Embed */
  readonly embed = LinkIds.Embed;

  /** A dispatcher function to download file in specified format */
  readonly download = dispatch(DownloadActions.Download);
  /** Selects the current value of the available ScreenMode Size */
  readonly size = selectSnapshot(ScreenModeSelectors.size);
}
