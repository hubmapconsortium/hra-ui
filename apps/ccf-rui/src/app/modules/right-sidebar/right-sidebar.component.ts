import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, inject, Input, Output } from '@angular/core';

import { AnatomicalStructureTagState } from '../../core/store/anatomical-structure-tags/anatomical-structure-tags.state';
import { ModelState } from '../../core/store/model/model.state';
import { PageState } from '../../core/store/page/page.state';
import { RegistrationState } from '../../core/store/registration/registration.state';
import { map } from 'rxjs';
import { MetadataService } from '../metadata/metadata.service';

/**
 * The right sidebar
 */
@Component({
  selector: 'ccf-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class RightSidebarComponent {
  readonly model = inject(ModelState);
  readonly registration = inject(RegistrationState);
  readonly page = inject(PageState);
  readonly astags = inject(AnatomicalStructureTagState);

  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-right-sidebar';

  /** Whether or not the initial registration modal has been closed */
  @Input() modalClosed = false;

  @Output() readonly registrationExpanded = new EventEmitter<boolean>();

  readonly position$ = this.model.position$.pipe(
    map((p) => ({ x: Math.floor(p.x), y: Math.floor(p.y), z: Math.floor(p.z) })),
  );

  protected readonly metadata = inject(MetadataService);

  setDefaultPosition() {
    if (this.registration.snapshot.initialRegistration) {
      this.registration.resetPosition();
    } else {
      this.model.setDefaultPosition();
    }
  }
}
