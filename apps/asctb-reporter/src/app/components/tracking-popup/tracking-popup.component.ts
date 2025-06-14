import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Consent, ConsentService } from '../../services/consent.service';

@Component({
  selector: 'app-tracking-popup',
  templateUrl: './tracking-popup.component.html',
  styleUrls: ['./tracking-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class TrackingPopupComponent {
  readonly consentService = inject(ConsentService);
  readonly data = inject<{ preClose: () => void }>(MAT_SNACK_BAR_DATA);
  readonly container = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  @HostBinding('class') readonly clsName = 'app-tracking-popup';

  get allowTelemetry(): Consent {
    return this.consentService.consent;
  }

  dismiss(): void {
    this.data.preClose();
  }

  submit(entry: boolean): void {
    this.consentService.setConsent(entry ? 'given' : 'rescinded');
    this.dismiss();
  }

  showButton(button: 'opt-in' | 'opt-out'): boolean {
    const { allowTelemetry } = this;
    if (allowTelemetry === 'not-set') {
      return true;
    }
    return button === 'opt-in' ? allowTelemetry === 'rescinded' : allowTelemetry === 'given';
  }
}
