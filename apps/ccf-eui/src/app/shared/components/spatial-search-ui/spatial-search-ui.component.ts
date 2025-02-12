import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { SpatialSceneNode, TissueBlock } from '@hra-api/ng-client';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import {
  ALL_ORGANS,
  BodyUiModule,
  OrganInfo,
  SpatialSearchKeyboardUIBehaviorModule,
  XYZPositionModule,
} from 'ccf-shared';
import { map, Observable, startWith } from 'rxjs';

import { Position, RadiusSettings, TermResult } from '../../../core/store/spatial-search-ui/spatial-search-ui.state';
import { Sex } from '../spatial-search-config/spatial-search-config.component';
import { TermOccurrenceListComponent } from '../term-occurence-list/term-occurrence.component';
import { TissueBlockListComponent } from '../tissue-block-list/tissue-block-list.component';

/**
 * Main Spatial Search UI component
 */
@Component({
  selector: 'ccf-spatial-search-ui',
  templateUrl: './spatial-search-ui.component.html',
  styleUrls: ['./spatial-search-ui.component.scss'],
  imports: [
    CommonModule,
    BodyUiModule,
    XYZPositionModule,
    TissueBlockListComponent,
    SpatialSearchKeyboardUIBehaviorModule,
    MatIconModule,
    MatSliderModule,
    TermOccurrenceListComponent,
    MatButtonModule,
    ButtonsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpatialSearchUiComponent implements OnInit {
  /** HTML Class */
  @HostBinding('class') readonly className = 'ccf-spatial-search-ui';

  /** Nodes in the scene */
  @Input() scene!: SpatialSceneNode[];

  /** Bounds of the scene */
  @Input() sceneBounds!: Position;

  /** Scene target */
  @Input() sceneTarget!: [number, number, number];

  /** Current selected sex */
  @Input() sex!: string;

  /** Current selected organ */
  @Input() referenceOrgan!: OrganInfo;

  /** Current sphere radius setting */
  @Input() radius!: number;

  /** Maximum, minimum, and default sphere radius values */
  @Input() radiusSettings!: RadiusSettings;

  /** Starting position of sphere */
  @Input() defaultPosition!: Position;

  /** Current position of sphere */
  @Input() position!: Position;

  /** Tissue blocks within the sphere radius */
  @Input() tissueBlocks!: TissueBlock[];

  /** Anatomical structures within the sphere radius */
  @Input() anatomicalStructures!: TermResult[];

  /** Cell types within the sphere radius */
  @Input() cellTypes!: TermResult[];

  /** Emits when run spatial search button clicked */
  @Output() readonly addSpatialSearch = new EventEmitter();

  /** Emits when reset probing sphere button clicked */
  @Output() readonly resetPosition = new EventEmitter();

  /** Emits when reset camera button clicked */
  @Output() readonly resetSphere = new EventEmitter();

  /** Emits when close button clicked */
  @Output() readonly closeSpatialSearch = new EventEmitter();

  /** Emits when the radius changes */
  @Output() readonly radiusChange = new EventEmitter<number>();

  /** Emits when the sphere position changes */
  @Output() readonly positionChange = new EventEmitter<Position>();

  /** Emits when the edit organ link is clicked */
  @Output() readonly editReferenceOrganClicked = new EventEmitter();

  /** Emits when info button in header is clicked */
  @Output() readonly infoClicked = new EventEmitter();

  /** Emits when a node in the scene is clicked */
  @Output() readonly nodeClicked = new EventEmitter<SpatialSceneNode>();

  /** Emits when sex is updated */
  @Output() readonly updateSex = new EventEmitter<Sex>();

  /** Emits when organ is updated */
  @Output() readonly updateOrgan = new EventEmitter<OrganInfo>();

  organControl = new FormControl<string | OrganInfo>('');

  filteredOrgans!: Observable<OrganInfo[]>;

  ngOnInit() {
    this.filteredOrgans = this.organControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : ALL_ORGANS.slice();
      }),
    );
  }

  displayFn(organ: OrganInfo): string {
    return organ && organ.name ? organ.name : '';
  }

  private _filter(name: string): OrganInfo[] {
    const filterValue = name.toLowerCase();
    return ALL_ORGANS.filter((organ) => organ.name.toLowerCase().includes(filterValue));
  }
}
