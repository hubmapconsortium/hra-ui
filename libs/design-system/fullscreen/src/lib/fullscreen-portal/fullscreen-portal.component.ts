import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  Directive,
  effect,
  inject,
  input,
  output,
  TemplateRef,
  viewChild,
  ViewContainerRef,
  ViewRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ExpansionPanelModule } from '@hra-ui/design-system/expansion-panel';
import { filter, MonoTypeOperatorFunction, pipe } from 'rxjs';

/** View outlet directive */
@Directive({
  selector: '[hraViewOutlet]',
  standalone: true,
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
  standalone: true,
  template: `<ng-content></ng-content>`,
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
  standalone: true,
  template: `<ng-content></ng-content>`,
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
  standalone: true,
  imports: [MatDialogModule, MatIconModule, ButtonsModule, ExpansionPanelModule, ViewOutletDirective],
  templateUrl: './fullscreen-portal.component.html',
  styleUrl: './fullscreen-portal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullscreenPortalComponent {
  /** Heading of the dialog */
  readonly tagline = input.required<string>();

  /** Classes to apply to the dialog panel in fullscreen mode */
  readonly panelClass = input<string | string[]>();

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

  /** Reference to the view outlet directive */
  private readonly viewOutlet = viewChild.required(ViewOutletDirective);

  /** Reference to the view content template */
  private readonly contentTemplateRef = viewChild.required<TemplateRef<void>>('contentTemplate');

  /** Reference to the view dialog template */
  private readonly dialogTemplateRef = viewChild.required<TemplateRef<void>>('dialogTemplate');

  /** Reference to the mat dialog */
  private dialogRef?: MatDialogRef<void>;

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
    if (this.dialogRef !== undefined) {
      return;
    }

    const { dialogService, dialogTemplateRef } = this;
    const panelClass = this.panelClass() ?? [];
    const normalizedPanelClass = typeof panelClass === 'string' ? panelClass.split(' ') : panelClass;

    this.beforeOpened.emit();
    const dialogRef = (this.dialogRef = dialogService.open(dialogTemplateRef(), {
      panelClass: [...normalizedPanelClass, 'fullscreen-panel'],
    }));

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
  }

  /** Closes the dialog */
  close(): void {
    this.dialogRef?.close();
  }

  /** Filters the dialog event based on provided dialog reference */
  private filterDialogEvents<T>(dialogRef: MatDialogRef<void>): MonoTypeOperatorFunction<T> {
    return pipe(
      takeUntilDestroyed(this.destroyRef),
      filter(() => this.dialogRef === dialogRef),
    );
  }
}
