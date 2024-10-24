import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  effect,
  inject,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Directive({
  selector: '[hraFullscreenContentOutlet]',
  standalone: true,
})
export class FullscreenContentOutletDirective {
  readonly viewContainerRef = inject(ViewContainerRef);
}

/** Fullscreen Component */
@Component({
  selector: 'hra-fullscreen',
  standalone: true,
  imports: [FullscreenContentOutletDirective],
  templateUrl: './fullscreen.component.html',
  styleUrl: './fullscreen.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullscreenComponent {
  private readonly contentOutlet = viewChild.required(FullscreenContentOutletDirective);
  /** Reference to the mat dialog data */
  private readonly viewRef = inject(MAT_DIALOG_DATA);

  constructor() {
    effect(() => {
      this.contentOutlet().viewContainerRef.insert(this.viewRef);
    });
  }
}
