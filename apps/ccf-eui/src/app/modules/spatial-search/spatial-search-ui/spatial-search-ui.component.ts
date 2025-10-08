import { ChangeDetectionStrategy, Component, HostBinding, input, output, signal, viewChild } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { FilterSexEnum, SpatialSceneNode, TissueBlock } from '@hra-api/ng-client';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { OrganInfo, SpatialSearchKeyboardUIBehaviorModule, XYZPositionModule } from 'ccf-shared';

import { HraCommonModule } from '@hra-ui/common';
import { Position, RadiusSettings, TermResult } from '../../../core/store/spatial-search-ui/spatial-search-ui.state';
import { SpatialSearchInputsComponent } from '../spatial-search-inputs/spatial-search-inputs.component';
import { TermOccurrenceListComponent } from '../term-occurence-list/term-occurrence.component';
import { TissueBlockListComponent } from '../tissue-block-list/tissue-block-list.component';
import { BodyUiComponent } from 'ccf-body-ui';

/**
 * Main Spatial Search UI component
 */
@Component({
  selector: 'ccf-spatial-search-ui',
  templateUrl: './spatial-search-ui.component.html',
  styleUrls: ['./spatial-search-ui.component.scss'],
  imports: [
    HraCommonModule,
    XYZPositionModule,
    SpatialSearchKeyboardUIBehaviorModule,
    MatIconModule,
    MatSliderModule,
    TissueBlockListComponent,
    TermOccurrenceListComponent,
    ButtonsModule,
    SpatialSearchInputsComponent,
    PlainTooltipDirective,
    MatMenuModule,
    MatDividerModule,
    BodyUiComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpatialSearchUiComponent {
  /** HTML Class */
  @HostBinding('class') readonly className = 'ccf-spatial-search-ui';

  /** Primary body UI component */
  readonly primaryUI = viewChild.required<BodyUiComponent>('primary');

  /** Nodes in the scene */
  readonly scene = input.required<SpatialSceneNode[]>();

  /** Bounds of the scene */
  readonly sceneBounds = input.required<Position>();

  /** Scene target */
  readonly sceneTarget = input.required<[number, number, number]>();

  /** Current organs */
  readonly organs = input.required<OrganInfo[]>();

  /** Current selected sex */
  readonly sex = input.required<FilterSexEnum>();

  /** Current selected organ */
  readonly referenceOrgan = input.required<OrganInfo>();

  /** Current sphere radius setting */
  readonly radius = input.required<number>();

  /** Maximum, minimum, and default sphere radius values */
  readonly radiusSettings = input.required<RadiusSettings>();

  /** Starting position of sphere */
  readonly defaultPosition = input.required<Position>();

  /** Current position of sphere */
  readonly position = input.required<Position>();

  /** Tissue blocks within the sphere radius */
  readonly tissueBlocks = input.required<TissueBlock[]>();

  /** Anatomical structures within the sphere radius */
  readonly anatomicalStructures = input.required<TermResult[]>();

  /** Cell types within the sphere radius */
  readonly cellTypes = input.required<TermResult[]>();

  /** Emits when run spatial search button clicked */
  readonly addSpatialSearch = output();

  /** Emits when reset position button clicked */
  readonly resetPosition = output();

  /** Emits when reset probing sphere button clicked */
  readonly resetSphere = output();

  /** Emits when close button clicked */
  readonly closeSpatialSearch = output();

  /** Emits when the radius changes */
  readonly radiusChange = output<number>();

  /** Emits when the sphere position changes */
  readonly positionChange = output<Position>();

  /** Emits when the edit organ link is clicked */
  readonly editReferenceOrganClicked = output();

  /** Emits when a node in the scene is clicked */
  readonly nodeClicked = output<SpatialSceneNode>();

  /** Emits when sex is updated */
  readonly updateSex = output<FilterSexEnum>();

  /** Emits when organ is updated */
  readonly updateOrgan = output<OrganInfo>();

  readonly rotation = signal<[number, number]>([0, 0]);

  /**
   * Resets view to default position, rotation, and bounds
   */
  resetView(): void {
    this.primaryUI().resetView();
  }
}
