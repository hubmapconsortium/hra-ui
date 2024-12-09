import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

import { AnatomicalStructureTagState } from '../../core/store/anatomical-structure-tags/anatomical-structure-tags.state';
import { ModelState } from '../../core/store/model/model.state';
import { PageState } from '../../core/store/page/page.state';
import { RegistrationState } from '../../core/store/registration/registration.state';
import { map } from 'rxjs';

/**
 * The right sidebar
 */
@Component({
  selector: 'ccf-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightSidebarComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-right-sidebar';

  /** Whether or not the initial registration modal has been closed */
  @Input() modalClosed = false;

  @Output() readonly registrationExpanded = new EventEmitter<boolean>();

  readonly position$ = this.model.position$.pipe(
    map((p) => ({ x: Math.floor(p.x), y: Math.floor(p.y), z: Math.floor(p.z) })),
  );

  /**
   * Creates an instance of right sidebar component.
   *
   * @param model Model state service
   * @param registration Registration state service
   * @param page The page state
   * @param astags The anatomical structure tags state
   */
  constructor(
    readonly model: ModelState,
    readonly registration: RegistrationState,
    readonly page: PageState,
    readonly astags: AnatomicalStructureTagState,
  ) {}

  setDefaultPosition() {
    if (this.registration.snapshot.initialRegistration) {
      this.registration.resetPosition();
    } else {
      this.model.setDefaultPosition();
    }
  }
}
