import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { dispatch, selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { ResourceRegistrySelectors as RR } from '@hra-ui/cdk/state';
import { ContactData, ContactModalComponent, InfoModalComponent } from '@hra-ui/components/molecules';
import { ResourceIds as Ids, ContactActions } from '@hra-ui/state';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

/** A Component for contact behavior which sends the message entered by the user and shows an acknowledgement */
@Component({
  selector: 'ftu-contact-behavior',
  imports: [CommonModule, MatDialogModule, ContactModalComponent, InfoModalComponent],
  templateUrl: './contact-behavior.component.html',
  styleUrls: ['./contact-behavior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactBehaviorComponent {
  /** A template to post a message */
  @ViewChild('postMessage') readonly postMessageTemplate!: TemplateRef<void>;

  /** Input for product logo URL to displayed on the left side. */
  readonly productLogoUrl = selectQuerySnapshot(RR.url, Ids.ProductLogoUrl);

  /** Input for product title to displayed on the left side. */
  readonly productTitle = selectQuerySnapshot(RR.anyText, Ids.ProductTitle);

  /** Information modal message to the user */
  readonly description = selectQuerySnapshot(RR.anyText, Ids.ContactAcknowledgement);

  /** A dispatcher function to send message entered by user */
  readonly sendMessage = dispatch(ContactActions.SendMessage);

  /** A dialog box which shows user an acknowledgement after clicking on submit */
  private readonly dialog = inject(MatDialog);

  /** A mat form field dialog which accepts the email, subject, and message of user and validates it */
  private readonly selfRef = inject(MatDialogRef, { optional: true });

  /** Dialog box which references the acknowledgement dialog box */
  private postRef?: MatDialogRef<void>;

  /** Google analytics tracking service */
  private readonly ga = inject(GoogleAnalyticsService);

  /** A function which sends/dispatches a message which contains email, subject, and message. And also opens the acknowledgement dialog box. */
  submit(message: ContactData): void {
    this.sendMessage(message);
    this.selfRef?.close();
    this.postRef = this.dialog.open(this.postMessageTemplate);
  }

  /** A function which closes the 'Contact us' dialog and the acknowledgement dialog.  */
  close(): void {
    if (this.postRef) {
      this.postRef.close();
      this.ga.event('acknowedgement_close', 'modal');
    }
    if (this.selfRef) {
      this.selfRef.close();
      this.ga.event('contact_close', 'modal');
    }
  }
}
