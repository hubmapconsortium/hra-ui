import { ChangeDetectionStrategy, Component, Input, OnDestroy, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { PanelData } from '../info-button/info-button.service';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { InfoButtonService } from './info-button.service';

/**
 * Info button component: Information icon displays project details when clicked.
 */
@Component({
  selector: 'ccf-info-button',
  templateUrl: './info-button.component.html',
  styleUrls: ['./info-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class InfoButtonComponent implements OnDestroy {
  /** Dialog service */
  private readonly dialog = inject(MatDialog);
  /** Info button service */
  private readonly infoButtonService = inject(InfoButtonService);

  /**
   * Title of the info dialog
   */
  @Input() infoTitle = '';

  /**
   * Whether the information is for the RUI or EUI
   */
  @Input() videoID!: string;

  /** Documentation url */
  @Input() documentationUrl!: string;

  /** Subscriptions */
  private readonly subscriptions = new Subscription();

  /**
   * Creates an instance of info button component.
   */
  constructor() {
    const infoButtonService = this.infoButtonService;

    this.subscriptions.add(
      infoButtonService.panelContent.subscribe((data) => {
        if (data.content.length) {
          this.launchInfoDialog(data);
        }
      }),
    );
  }

  /**
   * Unsubscribe to the observable when the component
   * is destroyed
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * Opens the info dialogue with the project details
   */
  launchInfoDialog(data: PanelData): void {
    if (this.dialog.openDialogs.length === 0) {
      //Prevent multiple dialogs from opening
      this.dialog.open(InfoDialogComponent, {
        autoFocus: false,
        panelClass: 'modal-animated',
        width: '72rem',
        data: {
          title: data.infoTitle,
          content: data.content,
          videoID: data.videoID,
        },
      });
    }
  }

  /**
   * Detects button click and updates panel data
   */
  onDialogButtonClick(): void {
    this.infoButtonService.updateData(this.documentationUrl, this.videoID, this.infoTitle);
  }
}
