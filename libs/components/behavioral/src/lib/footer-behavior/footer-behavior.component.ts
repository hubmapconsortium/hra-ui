import { ChangeDetectionStrategy, Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { ResourceRegistrySelectors as RR } from '@hra-ui/cdk/state';
import { ResourceIds as Ids } from '@hra-ui/state';
import { FooterComponent } from '@hra-ui/components/molecules';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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
  /** A template to post a message */
  @ViewChild('postContact') readonly postContactTemplate!: TemplateRef<void>;

  /** Input for product logo URL to displayed on the left side. */
  readonly productLogoUrl = selectQuerySnapshot(RR.url, Ids.ProductLogoUrl);

  /** Input for product title to displayed on the left side. */
  readonly productTitle = selectQuerySnapshot(RR.anyText, Ids.ProductTitle);

  /** A dialog box which shows contact modal after clicking on contact */
  private readonly dialog = inject(MatDialog);

  /** A function which opens the contact modal dialog box */
  contact(): void {
    this.dialog.open(ContactBehaviorComponent);
  }
}
