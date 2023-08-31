import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { dispatch, selectQuerySnapshot, selectSnapshot } from '@hra-ui/cdk/injectors';
import { LinkRegistryActions, LinkType, ResourceRegistrySelectors as RR, createLinkId } from '@hra-ui/cdk/state';
import { FooterComponent } from '@hra-ui/components/molecules';
import { DownloadActions, DownloadSelectors, ResourceIds as Ids, LinkIds } from '@hra-ui/state';
import { ContactBehaviorComponent } from '../contact-behavior/contact-behavior.component';
import { Router } from '@angular/router';

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

  /** A dispatch function to navigate to the Illustration */
  readonly navigateToIllustration = dispatch(LinkRegistryActions.Navigate);

  /** A dispatch function which adds the link to the registry */
  readonly addLinkToRegistry = dispatch(LinkRegistryActions.Add);

  /** Injecting the router */
  private router = inject(Router);

  /** Hra portal link routing after clicking on HRA Portal */
  readonly hraPortal = LinkIds.Portal;

  /** Embed link routing after clicking on Embed */
  readonly embed = LinkIds.Embed;

  /** A dispatcher function to download file in specified format */
  readonly download = dispatch(DownloadActions.Download);

  /** A dialog box which shows contact modal after clicking on contact */
  private readonly dialog = inject(MatDialog);

  /** A function which opens the contact modal dialog box */
  contact(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    this.dialog.open(ContactBehaviorComponent, dialogConfig);
  }
  /** A function which gets the organ and sets the Illustration link correctly */
  illustrationLink(): void {
    const organName = this.router.url.split('2F').slice(-1)[0];
    const url = `https://hubmapconsortium.github.io/ccf-releases/v1.4/docs/2d-ftu/2d-ftu-${organName}.html`;
    const IllustrationLink = createLinkId(organName);
    this.addLinkToRegistry(IllustrationLink, { type: LinkType.External, url: url });
    this.navigateToIllustration(IllustrationLink);
  }
}
