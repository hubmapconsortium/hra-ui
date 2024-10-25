import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  Directive,
  inject,
  output,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FullscreenComponent, FullscreenComponentData } from '../fullscreen/fullscreen.component';

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
  readonly beforeOpened = output<void>();
  readonly opened = output<void>();
  readonly beforeClosed = output<void>();
  readonly closed = output<void>();

  readonly rootNodes = computed(() => this.content().viewRef.rootNodes);

  /** Reference to the mat dialog */
  private readonly dialogService = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  /** Instance of the fullscreen portal content directive */
  private readonly content = viewChild.required(FullscreenPortalContentDirective);

  private dialogRef?: MatDialogRef<FullscreenComponent, FullscreenComponentData>;

  constructor() {
    this.destroyRef.onDestroy(() => this.close());
  }

  /** Detaches the view from histogram module and attaches it to the view in the dialog */
  open(): void {
    if (this.dialogRef !== undefined) {
      return;
    }

    const { destroyRef, dialogService } = this;
    const { viewContainerRef, viewRef } = this.content();
    const index = viewContainerRef.indexOf(viewRef);

    this.beforeOpened.emit();
    viewContainerRef.detach(index);

    const dialogRef = (this.dialogRef = dialogService.open(FullscreenComponent, {
      data: viewRef,
      panelClass: 'fullscreen-panel',
    }));

    dialogRef
      .afterOpened()
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe(() => {
        this.opened.emit();
      });

    dialogRef
      .beforeClosed()
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe(() => {
        this.beforeClosed.emit();
        viewContainerRef.insert(viewRef);
      });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe(() => {
        this.dialogRef = undefined;
        this.closed.emit();
      });
  }

  close(): void {
    this.dialogRef?.close();
  }
}
