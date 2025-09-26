import {
  ChangeDetectionStrategy,
  Component,
  effect,
  HostBinding,
  inject,
  input,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { NodeDragEvent } from 'ccf-body-ui';
import { BodyUiComponent } from 'ccf-shared';
import { combineLatest } from 'rxjs';
import { distinctUntilKeyChanged, map } from 'rxjs/operators';

import { ModelState } from '../../core/store/model/model.state';
import { PageState } from '../../core/store/page/page.state';
import { RegistrationState } from '../../core/store/registration/registration.state';
import { SceneState } from '../../core/store/scene/scene.state';

/**
 * Main content component
 */
@Component({
  selector: 'ccf-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ContentComponent implements OnInit {
  /** Model state */
  readonly model = inject(ModelState);
  /** Page state */
  readonly page = inject(PageState);
  /** Registration state */
  readonly registration = inject(RegistrationState);
  /** Scene state */
  readonly scene = inject(SceneState);

  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-content';

  /** Mini model gizmo */
  readonly gizmo = viewChild.required<BodyUiComponent>('gizmo');

  /** Disable keyboard position interactions */
  readonly disablePositionChange = input(false);

  /** Rotation values for mini model gizmo [y-axis rotation, x-axis rotation] */
  readonly gizmoRotation = signal<[number, number]>([0, 0]);

  /** Current position of block */
  readonly position$ = this.model.position$.pipe(
    map((p) => ({ x: Math.floor(p.x), y: Math.floor(p.y), z: Math.floor(p.z) })),
  );

  /** Whether the view type is 3d or register */
  readonly is3DView$ = this.model.viewType$.pipe(map((type) => type === '3d'));

  /** Bounds of model */
  readonly bounds$ = this.model.organDimensions$.pipe(
    map((dims) => ({
      x: Math.max(dims.x, this.model.defaultPosition.x + 40) / 1000,
      y: Math.max(dims.y, this.model.defaultPosition.y + 40) / 1000,
      z: Math.max(dims.z, this.model.defaultPosition.z + 40) / 1000,
    })),
    distinctUntilKeyChanged('x'),
    distinctUntilKeyChanged('y'),
  );

  /**
   * Update gizmo rotation
   */
  constructor() {
    effect(() => {
      this.gizmo().rotation = this.gizmoRotation()[0];
      this.gizmo().rotationX = this.gizmoRotation()[1];
    });
  }

  /**
   * Updates the gizmo rotation based on the scene rotation when not in 3D view
   */
  ngOnInit(): void {
    combineLatest([this.is3DView$, this.scene.rotation$]).subscribe(([is3D, rotation]) => {
      if (!is3D) {
        this.gizmoRotation.set([rotation, 0]);
      }
    });
  }

  /** Handle node drag */
  handleNodeDrag(event: NodeDragEvent): void {
    if (event.node['@id'] === '#DraftPlacement') {
      if (event.info.coordinate) {
        const [a, b] = (event.info.coordinate as number[]).map((n) => n * 1000) as [number, number];
        const { position, viewSide, organDimensions } = this.model.snapshot;
        const dims = [organDimensions.x, organDimensions.y, organDimensions.z].map((n) => n / 2);
        let newPosition = position;
        switch (viewSide) {
          case 'anterior':
            newPosition = { x: a + dims[0], y: b + dims[1], z: position.z };
            break;
          case 'posterior':
            newPosition = { x: -a + dims[0], y: b + dims[1], z: position.z };
            break;
          case 'left':
            newPosition = { x: position.x, y: b + dims[1], z: -a + dims[2] };
            break;
          case 'right':
            newPosition = { x: position.x, y: b + dims[1], z: a + dims[2] };
            break;
        }
        this.model.setPosition(newPosition);
      }
    }
  }
}
