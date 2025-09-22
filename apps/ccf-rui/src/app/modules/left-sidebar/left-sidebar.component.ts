import { ChangeDetectionStrategy, Component, HostBinding, inject, Input, signal, viewChild } from '@angular/core';
import { ExpansionPanelComponent } from '@hra-ui/design-system/expansion-panel';
import { map } from 'rxjs/operators';

import { ModelState } from '../../core/store/model/model.state';
import { PageState } from '../../core/store/page/page.state';
import { RegistrationState } from '../../core/store/registration/registration.state';

/**
 * The left sidebar
 */
@Component({
  selector: 'ccf-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
  host: {
    '[attr.as-expanded]': 'asExpanded() && !landmarkExpanded()',
    '[attr.landmark-expanded]': '!asExpanded() && landmarkExpanded()',
    '[attr.both-expanded]': 'landmarkExpanded() && asExpanded()',
  },
})
export class LeftSidebarComponent {
  /** Page state */
  readonly page = inject(PageState);
  /** Model state */
  readonly model = inject(ModelState);
  /** Registration state */
  readonly registration = inject(RegistrationState);

  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-left-sidebar';

  /** Whether or not the initial registration modal has been closed */
  @Input() modalClosed = false;

  /** Whether an organ is selected */
  readonly organSelected$ = this.model.organ$.pipe(map((organ) => (organ === undefined ? false : true)));

  /** Anatomical structures panel component */
  readonly asPanel = viewChild.required<ExpansionPanelComponent>('asPanel');
  /** Landmarks panel component */
  readonly landmarkPanel = viewChild.required<ExpansionPanelComponent>('landmarkPanel');
  /** Whether the anatomical structures panel is expanded */
  readonly asExpanded = signal(true);
  /** Whether the landmarks panel is expanded */
  readonly landmarkExpanded = signal(true);

  /**
   * Variable that keeps track of the extraction site tooltip to display on
   * the stage when hovered.
   */
  extractionSiteTooltip = '';

  /** Anatomical stucture tooltip */
  asTooltip =
    'Parts of the body in defined locations and regions, including the surface, internal organs and tissues. These structures may be described by gross or microscopic morphology and include functional tissue units and highly organized cellular ecosystems (such as alveoli in the lungs).';

  /** Landmarks tooltip */
  landmarksTooltip = 'Some organs have predefined landmarks to help guide manual tissue registration.';
}
