import { Directive, inject, output, TemplateRef, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FullscreenComponent } from './fullscreen.component';

@Directive({
  selector: '[hraFullscreen]',
  standalone: true,
  exportAs: 'hraFullscreen',
})
export class FullscreenDirective {
  readonly closed = output<void>({ alias: 'hraFullscreenClosed' });

  get nativeElement(): HTMLElement {
    return this.viewRef.rootNodes[0];
  }

  private readonly dialog = inject(MatDialog);
  private readonly templateRef = inject(TemplateRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef);

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
