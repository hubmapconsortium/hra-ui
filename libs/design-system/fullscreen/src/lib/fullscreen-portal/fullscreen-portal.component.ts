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
import { ButtonModule } from '@hra-ui/design-system/button';
import { ExpansionPanelModule } from '@hra-ui/design-system/expansion-panel';

@Directive({
  selector: '[hraViewOutlet]',
  standalone: true,
})
export class ViewOutletDirective {
  readonly viewRef = input<ViewRef | undefined>(undefined, { alias: 'hraViewOutlet' });

  private readonly viewContainerRef = inject(ViewContainerRef);

  constructor() {
    effect(() => this.attach());
  }

  attach(): void {
    const viewRef = this.viewRef();
    if (viewRef) {
      this.viewContainerRef.insert(viewRef);
    }
  }

  detach(): void {
    const viewRef = this.viewRef();
    const index = viewRef ? this.viewContainerRef.indexOf(viewRef) : -1;
    if (index >= 0) {
      this.viewContainerRef.detach(index);
    }
  }
}

@Component({
  selector: 'hra-fullscreen-actions',
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
export class FullscreenActionsComponent {}

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
  imports: [MatDialogModule, MatIconModule, ButtonModule, ExpansionPanelModule, ViewOutletDirective],
  templateUrl: './fullscreen-portal.component.html',
  styleUrl: './fullscreen-portal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullscreenPortalComponent {
  readonly title = input.required<string>();

  readonly beforeOpened = output<void>();
  readonly opened = output<void>();
  readonly beforeClosed = output<void>();
  readonly closed = output<void>();

  readonly viewRef = computed(() => {
    return this.viewContainerRef.createEmbeddedView(this.contentTemplateRef());
  });
  readonly rootNodes = computed(() => this.viewRef().rootNodes);

  /** Reference to the mat dialog */
  private readonly dialogService = inject(MatDialog);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly destroyRef = inject(DestroyRef);

  private readonly viewOutlet = viewChild.required(ViewOutletDirective);
  private readonly contentTemplateRef = viewChild.required<TemplateRef<void>>('contentTemplate');
  private readonly dialogTemplateRef = viewChild.required<TemplateRef<void>>('dialogTemplate');

  private dialogRef?: MatDialogRef<void>;

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.close();
      this.viewRef().destroy();
    });
  }

  /** Detaches the view from histogram module and attaches it to the view in the dialog */
  open(): void {
    if (this.dialogRef !== undefined) {
      return;
    }

    const { destroyRef, dialogService, dialogTemplateRef } = this;

    this.beforeOpened.emit();
    const dialogRef = (this.dialogRef = dialogService.open(dialogTemplateRef(), {
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
        this.viewOutlet().attach();
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
