import { Shallow } from 'shallow-render';
import { ConsentService } from 'ccf-shared/analytics';
import { TrackingPopupComponent } from './tracking-popup.component';
import { TrackingPopupModule } from './tracking-popup.module';
import { ElementRef } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

describe('TrackingPopupComponent', () => {
  let shallow: Shallow<TrackingPopupComponent>;

  beforeEach(() => {
    shallow = new Shallow(TrackingPopupComponent, TrackingPopupModule)
      .provide({ provide: ElementRef, useValue: {} })
      .provide({ provide: MAT_SNACK_BAR_DATA, useValue: { preClose: () => undefined } })
      .provide({ provide: ConsentService, useValue: {} })
      .mock(ConsentService, {
        consent: 'not-set',
        setConsent: jest.fn(),
      })
      .mock(MAT_SNACK_BAR_DATA, { preClose: () => undefined });
  });

  it('dismisses the popup', async () => {
    const { instance } = await shallow.render();
    const spy = jest.spyOn(instance.data, 'preClose');
    instance.dismiss();
    expect(spy).toHaveBeenCalled();
  });

  it('shows the opt-in button if allowTelemetry is undefined', async () => {
    const { instance } = await shallow.render();
    instance.showButton('opt-in');
    expect(instance.showButton('opt-in')).toBeTruthy();
  });

  it('hides the opt-in button if allowTelemetry is true', async () => {
    const { instance, inject } = await shallow.render();
    inject(ConsentService).consent = 'given';
    instance.showButton('opt-in');
    expect(instance.showButton('opt-in')).toBeFalsy();
  });

  it('shows the opt-out button if allowTelemetry is false', async () => {
    const { instance, inject } = await shallow.render();
    inject(ConsentService).consent = 'rescinded';
    instance.showButton('opt-out');
    expect(instance.showButton('opt-in')).toBeTruthy();
  });

  it('submits the selection', async () => {
    const { instance, inject } = await shallow.render();
    inject(ConsentService).consent = 'rescinded';
    const spy = jest.spyOn(instance, 'dismiss');
    instance.submit(true);
    expect(spy).toHaveBeenCalled();
  });
});
