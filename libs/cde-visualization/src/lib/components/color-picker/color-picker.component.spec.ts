import { OverlayModule } from '@angular/cdk/overlay';
import { Component, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Rgb } from '@hra-ui/design-system/color-picker';
import { fireEvent, render, screen, waitFor } from '@testing-library/angular';
import { ColorPickerDirective } from 'ngx-color-picker';
import { ColorPickerComponent } from './color-picker.component';

@Component({
  imports: [ColorPickerComponent, OverlayModule],
  template: `
    <button cdkOverlayOrigin (click)="open.set(true)" #origin="cdkOverlayOrigin">B cells</button>
    <cde-color-picker
      label="B cells color"
      [origin]="origin"
      [(open)]="open"
      [(color)]="color"
      (preview)="preview($event)"
    />
  `,
})
class TestHostComponent {
  readonly open = signal(false);
  readonly color = signal<Rgb>([0, 0, 0]);
  readonly preview = jest.fn();
}

describe('ColorPickerComponent', () => {
  async function setup() {
    const result = await render(TestHostComponent);
    fireEvent.click(screen.getByRole('button', { name: 'B cells' }));
    await result.fixture.whenStable();

    const picker = result.fixture.debugElement
      .query(By.directive(ColorPickerDirective))
      .injector.get(ColorPickerDirective);
    return { ...result, host: result.fixture.componentInstance, picker };
  }

  it('opens a labeled dialog beside its origin and focuses the hex field', async () => {
    await setup();

    const dialog = screen.getByRole('dialog', { name: 'B cells color' });
    expect(dialog.closest('.cde-color-picker-panel')).not.toBeNull();
    expect(dialog).toContainElement(document.activeElement as HTMLElement);
  });

  it('keeps an applied color and returns focus to the origin', async () => {
    const { host, picker, fixture } = await setup();

    // ngx-color-picker emits selections asynchronously
    picker.colorPickerSelect.emit('#ff0000');
    await waitFor(() => expect(host.open()).toBe(false));
    fixture.detectChanges();

    expect(host.color()).toEqual([255, 0, 0]);
    expect(screen.getByRole('button', { name: 'B cells' })).toHaveFocus();
  });

  it('keeps the previewed color on a click outside', async () => {
    const { host, picker } = await setup();

    picker.colorPickerChange.emit('#00ff00');
    expect(host.preview).toHaveBeenLastCalledWith('#00ff00');

    fireEvent.click(document.querySelector('.cdk-overlay-backdrop') as Element);
    expect(host.color()).toEqual([0, 255, 0]);
    expect(host.open()).toBe(false);
  });

  it('discards the previewed color on Escape or Cancel', async () => {
    const { host, picker, fixture } = await setup();

    picker.colorPickerChange.emit('#00ff00');
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(host.color()).toEqual([0, 0, 0]);
    expect(host.preview).toHaveBeenLastCalledWith('#000000');
    expect(host.open()).toBe(false);

    host.open.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.debugElement
      .query(By.directive(ColorPickerDirective))
      .injector.get(ColorPickerDirective)
      .colorPickerCancel.emit('#000000');
    await waitFor(() => expect(host.open()).toBe(false));
  });
});
