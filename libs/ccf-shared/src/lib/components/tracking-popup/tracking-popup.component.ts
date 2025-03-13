import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Consent, ConsentService } from 'ccf-shared/analytics';

/** Tracking popup */
@Component({
  selector: 'ccf-tracking-popup',
  templateUrl: './tracking-popup.component.html',
  styleUrls: ['./tracking-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class TrackingPopupComponent {
  /** Class name */
  @HostBinding('class') readonly clsName = 'ccf-tracking-popup';

  /** Get whether telemetry is enabled */
  get allowTelemetry(): Consent {
    return this.consentService.consent;
  }

  /** Consent service */
  readonly consentService = inject(ConsentService);
  /** Data from opener */
  readonly data = inject(MAT_SNACK_BAR_DATA);
  /** Popup container */
  readonly container = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  /** Dismiss the popup */
  dismiss(): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    this.data.preClose();
  }

  /** Set consent and dismiss */
  submit(entry: boolean): void {
    this.consentService.setConsent(entry ? 'given' : 'rescinded');
    this.dismiss();
  }

  /** Whether to show the opt in/out button */
  showButton(button: 'opt-in' | 'opt-out'): boolean {
    const { allowTelemetry } = this;
    if (allowTelemetry === 'not-set') {
      return true;
    } else {
      return button === 'opt-in' ? allowTelemetry === 'rescinded' : allowTelemetry === 'given';
    }
  }
}
