import { hasModifierKey } from '@angular/cdk/keycodes';
import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  Directive,
  effect,
  inject,
  input,
  NgZone,
  output,
  TemplateRef,
  viewChild,
  ViewContainerRef,
  ViewRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ExpansionPanelModule } from '@hra-ui/design-system/expansion-panel';
import { filter, firstValueFrom, MonoTypeOperatorFunction, Observable, pipe } from 'rxjs';

/** View outlet directive */
@Directive({
  selector: '[hraViewOutlet]',
})
export class ViewOutletDirective {
  /** view reference input */
  readonly viewRef = input<ViewRef | undefined>(undefined, { alias: 'hraViewOutlet' });

  /** Reference of the view container */
  private readonly viewContainerRef = inject(ViewContainerRef);

  /** Attaches the view */
  constructor() {
    effect(() => this.attach());
  }

  /** Attaches the view to the view container */
  attach(): void {
    const viewRef = this.viewRef();
    if (viewRef) {
      this.viewContainerRef.insert(viewRef);
    }
  }
  /** Detaches the view from the view container */
  detach(): void {
    const viewRef = this.viewRef();
    const index = viewRef ? this.viewContainerRef.indexOf(viewRef) : -1;
    if (index >= 0) {
      this.viewContainerRef.detach(index);
    }
  }
}

/** Fullscreen actions component */
@Component({
  selector: 'hra-fullscreen-actions',
  template: `<ng-content />`,
  styles: `
    :host {
      display: flex;
      width: 100%;
      height: 100%;
      flex-direction: row;
      align-items: center;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullscreenActionsComponent {}

/** Fullscreen portal content component */
@Component({
  selector: 'hra-fullscreen-portal-content',
  template: `<ng-content />`,
  styles: `
    :host {
      width: 100%;
      height: 100%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullscreenPortalContentComponent {}

/** Fullscreen Component */
@Component({
  selector: 'hra-fullscreen-portal',
  imports: [HraCommonModule, MatDialogModule, MatIconModule, ButtonsModule, ExpansionPanelModule, ViewOutletDirective],
  templateUrl: './fullscreen-portal.component.html',
  styleUrl: './fullscreen-portal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullscreenPortalComponent {
  /** Heading of the dialog */
  readonly tagline = input.required<string>();

  /** Classes to apply to the dialog panel in fullscreen mode */
  readonly panelClass = input<string | string[]>();

  /**
   * Whether opening and closing cross-fade between the page and the fullscreen view in a view transition,
   * where the browser supports them. The old view stays on screen until the app is stable after the change,
   * so content that resizes itself for the new view can finish first by marking that work with `PendingTasks`.
   */
  readonly viewTransition = input(false, { transform: booleanAttribute });

  /** Event for before the dialog is opened */
  readonly beforeOpened = output<void>();
  /** Event for when the dialog is opened */
  readonly opened = output<void>();
  /** Event for before the dialog is closed */
  readonly beforeClosed = output<void>();
  /** Event for when the dialog is closed */
  readonly closed = output<void>();

  /** Creates embedded view using template */
  readonly viewRef = computed(() => {
    return this.viewContainerRef.createEmbeddedView(this.contentTemplateRef());
  });

  /** Rootnodes of the view reference */
  readonly rootNodes = computed(() => this.viewRef().rootNodes);

  /** Reference to the mat dialog */
  private readonly dialogService = inject(MatDialog);

  /** Reference to the view container */
  private readonly viewContainerRef = inject(ViewContainerRef);

  /** Reference to the destroy ref */
  private readonly destroyRef = inject(DestroyRef);

  /** Reference to the document, used to start view transitions */
  private readonly document = inject(DOCUMENT);

  /** Reference to the application, used to wait until the content settles in a view transition */
  private readonly appRef = inject(ApplicationRef);

  /** Reference to the zone, used to open and close the dialog in it from a view transition */
  private readonly ngZone = inject(NgZone);

  /** Reference to the view outlet directive */
  private readonly viewOutlet = viewChild.required(ViewOutletDirective);

  /** Reference to the view content template */
  private readonly contentTemplateRef = viewChild.required<TemplateRef<void>>('contentTemplate');

  /** Reference to the view dialog template */
  private readonly dialogTemplateRef = viewChild.required<TemplateRef<void>>('dialogTemplate');

  /** Reference to the mat dialog */
  private dialogRef?: MatDialogRef<void>;

  /** Whether a view transition is opening or closing the dialog */
  private transitioning = false;

  /** Destroys the view */
  constructor() {
    this.destroyRef.onDestroy(() => {
      const dialogRef = this.dialogRef;
      this.dialogRef = undefined;
      dialogRef?.close();
      this.viewRef().destroy();
    });
  }

  /** Detaches the view from histogram module and attaches it to the view in the dialog */
  open(): void {
    if (this.dialogRef !== undefined || this.transitioning) {
      return;
    }

    this.runTransition(() => this.openDialog().afterOpened());
  }

  /** Closes the dialog */
  close(): void {
    const dialogRef = this.dialogRef;
    if (dialogRef === undefined || this.transitioning) {
      return;
    }

    this.runTransition(() => {
      dialogRef.close();
      return dialogRef.afterClosed();
    });
  }

  /**
   * Opens the dialog
   *
   * @returns Reference to the opened dialog
   */
  private openDialog(): MatDialogRef<void> {
    const { dialogService, dialogTemplateRef } = this;
    const panelClass = this.panelClass() ?? [];
    const normalizedPanelClass = typeof panelClass === 'string' ? panelClass.split(' ') : panelClass;

    this.beforeOpened.emit();
    const useViewTransition = this.useViewTransition();
    const dialogRef = (this.dialogRef = dialogService.open(dialogTemplateRef(), {
      panelClass: [...normalizedPanelClass, 'fullscreen-panel'],
      // The view transition fades the dialog in and out, so the dialog's own animations are off
      ...(useViewTransition && { disableClose: true, enterAnimationDuration: 0, exitAnimationDuration: 0 }),
    }));

    if (useViewTransition) {
      // Escape closes the dialog through close(), so closing runs in a view transition too
      dialogRef
        .keydownEvents()
        .pipe(
          this.filterDialogEvents(dialogRef),
          filter((event) => event.key === 'Escape' && !hasModifierKey(event)),
        )
        .subscribe(() => this.close());
    }

    dialogRef
      .afterOpened()
      .pipe(this.filterDialogEvents(dialogRef))
      .subscribe(() => {
        this.opened.emit();
      });

    dialogRef
      .beforeClosed()
      .pipe(this.filterDialogEvents(dialogRef))
      .subscribe(() => {
        this.beforeClosed.emit();
        this.viewOutlet().attach();
      });

    dialogRef
      .afterClosed()
      .pipe(this.filterDialogEvents(dialogRef))
      .subscribe(() => {
        this.dialogRef = undefined;
        this.closed.emit();
      });

    return dialogRef;
  }

  /**
   * Opens or closes the dialog, in a view transition when enabled and supported
   *
   * @param change Opens or closes the dialog and returns an observable that emits once it has
   */
  private runTransition(change: () => Observable<unknown>): void {
    if (!this.useViewTransition()) {
      change();
      return;
    }

    const done = () => (this.transitioning = false);
    this.transitioning = true;
    this.document
      .startViewTransition(async () => {
        await firstValueFrom(this.ngZone.run(change));
        await this.appRef.whenStable();
      })
      .updateCallbackDone.then(done, done);
  }

  /**
   * Whether opening and closing run in view transitions
   *
   * @returns True if view transitions are enabled and the browser supports them
   */
  private useViewTransition(): boolean {
    return this.viewTransition() && typeof this.document.startViewTransition === 'function';
  }

  /** Filters the dialog event based on provided dialog reference */
  private filterDialogEvents<T>(dialogRef: MatDialogRef<void>): MonoTypeOperatorFunction<T> {
    return pipe(
      takeUntilDestroyed(this.destroyRef),
      filter(() => this.dialogRef === dialogRef),
    );
  }
}
