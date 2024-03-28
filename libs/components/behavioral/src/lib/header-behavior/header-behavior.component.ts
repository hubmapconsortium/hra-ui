import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { ResourceRegistrySelectors as RR } from '@hra-ui/cdk/state';
import { HeaderComponent } from '@hra-ui/components/molecules';
import { ResourceIds as Ids, LinkIds } from '@hra-ui/state';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { ContactBehaviorComponent } from '../contact-behavior/contact-behavior.component';

/** Component for Header Behavior */
@Component({
  selector: 'ftu-header-behavior',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './header-behavior.component.html',
  styleUrls: ['./header-behavior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderBehaviorComponent {
  /**
   * Input for product logo URL to displayed on the left side.
   */
  readonly productLogoUrl = selectQuerySnapshot(RR.url, Ids.ProductLogoUrl);

  /**
   * Input for product title to displayed on the left side.
   */
  readonly productTitle = selectQuerySnapshot(RR.anyText, Ids.ProductTitle);

  /**
   * Input for app title to show on the left side.
   */
  readonly appTitle = selectQuerySnapshot(RR.anyText, Ids.AppTitle);

  /**
   * Input for product title link for user click action
   */
  readonly productTitleLink = LinkIds.ProductTitle;

  /**
   * Input for about link for user click action.
   */
  readonly aboutLink = LinkIds.About;

  /** A dialog box which shows contact modal after clicking on contact */
  private readonly dialog = inject(MatDialog);

  /** Google analytics tracking service */
  private readonly ga = inject(GoogleAnalyticsService);

  /** A function which opens the contact modal dialog box */
  contact(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    this.dialog.open(ContactBehaviorComponent, dialogConfig);
    this.ga.event('contact_open', 'modal');
  }
}
