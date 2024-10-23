import { Directive, inject, output, TemplateRef, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FullscreenComponent } from './fullscreen.component';

/** Fullscreen directive */
@Directive({
  selector: '[hraFullscreen]',
  standalone: true,
  exportAs: 'hraFullscreen',
})
export class FullscreenDirective {
  /** Output to emit when fullscreen is closed */
  readonly closed = output<void>({ alias: 'hraFullscreenClosed' });

  /** Returns the native element of the view reference */
  get nativeElement(): HTMLElement {
    return this.viewRef.rootNodes[0];
  }

  /** Reference to the mat dialog */
  private readonly dialog = inject(MatDialog);
  /** Reference to the template */
  private readonly templateRef = inject(TemplateRef);
  /** Reference to the view container */
  private readonly viewContainerRef = inject(ViewContainerRef);
  /** Create view reference using the template */
  private readonly viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef);

  /** Detaches the view from histogram module and attaches it to the view in the dialog */
  open(): void {
    const { viewContainerRef, viewRef } = this;
    const index = viewContainerRef.indexOf(viewRef);
    viewContainerRef.detach(index);

    const dialogRef = this.dialog.open(FullscreenComponent, {
      data: viewRef,
    });

    const subs = new Subscription();
    const sub1 = dialogRef.beforeClosed().subscribe(() => {
      viewContainerRef.insert(viewRef);
    });

    const sub2 = dialogRef.afterClosed().subscribe(() => {
      this.closed.emit();
    });

    subs.add(sub1);
    subs.add(sub2);
  }
}
