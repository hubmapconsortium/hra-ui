import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  effect,
  inject,
  viewChild,
  ViewContainerRef,
  ViewRef,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {
  ExpansionPanelActionsComponent,
  ExpansionPanelComponent,
  ExpansionPanelHeaderContentComponent,
} from '@hra-ui/design-system/expansion-panel';

export type FullscreenComponentData = ViewRef;

/** Fullscreen content outlet directive */
@Directive({
  selector: '[hraFullscreenContentOutlet]',
  standalone: true,
})
export class FullscreenContentOutletDirective {
  /** Instance of the view container */
  readonly viewContainerRef = inject(ViewContainerRef);
}

/** Fullscreen Component */
@Component({
  selector: 'hra-fullscreen',
  standalone: true,
  imports: [
    FullscreenContentOutletDirective,
    ExpansionPanelComponent,
    ExpansionPanelActionsComponent,
    MatButtonModule,
    ExpansionPanelHeaderContentComponent,
    MatIconModule,
  ],
  templateUrl: './fullscreen.component.html',
  styleUrl: './fullscreen.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullscreenComponent {
  /** Instance of the fullscreen content outlet directive */
  private readonly contentOutlet = viewChild.required(FullscreenContentOutletDirective);
  /** Reference to the mat dialog data */
  private readonly viewRef = inject(MAT_DIALOG_DATA);

  /** Inserts the view reference into the view container reference */
  constructor() {
    effect(() => {
      this.contentOutlet().viewContainerRef.insert(this.viewRef);
    });
  }
}
