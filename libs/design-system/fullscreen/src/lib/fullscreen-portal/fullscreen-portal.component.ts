import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  inject,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FullscreenComponent } from '../fullscreen/fullscreen.component';

/** Fullscreen directive */
@Directive({
  selector: '[hraFullscreenPortalContent]',
  standalone: true,
})
export class FullscreenPortalContentDirective {
  /** Reference to the template */
  readonly templateRef = inject(TemplateRef);
  /** Reference to the view container */
  readonly viewContainerRef = inject(ViewContainerRef);
  /** Create view reference using the template */
  readonly viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef);
}

/** Fullscreen Component */
@Component({
  selector: 'hra-fullscreen-portal',
  standalone: true,
  imports: [FullscreenPortalContentDirective],
  templateUrl: './fullscreen-portal.component.html',
  styleUrl: './fullscreen-portal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullscreenPortalComponent {
  get nativeElement(): HTMLElement {
    return this.content().viewRef.rootNodes[0];
  }

  /** Reference to the mat dialog */
  private readonly dialog = inject(MatDialog);

  private readonly content = viewChild.required(FullscreenPortalContentDirective);

  /** Detaches the view from histogram module and attaches it to the view in the dialog */
  open(): void {
    const { viewContainerRef, viewRef } = this.content();
    const index = viewContainerRef.indexOf(viewRef);
    viewContainerRef.detach(index);

    const dialogRef = this.dialog.open(FullscreenComponent, {
      data: viewRef,
      panelClass: 'fullscreen-panel',
    });

    const subs = new Subscription();
    const sub1 = dialogRef.beforeClosed().subscribe(() => {
      viewContainerRef.insert(viewRef);
    });

    const sub2 = dialogRef.afterClosed().subscribe(() => {
      // this.closed.emit();
    });

    subs.add(sub1);
    subs.add(sub2);
  }
}
