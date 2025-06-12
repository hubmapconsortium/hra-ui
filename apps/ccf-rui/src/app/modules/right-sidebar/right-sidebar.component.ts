import { ChangeDetectionStrategy, Component, computed, inject, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { AnatomicalStructureTagState } from '../../core/store/anatomical-structure-tags/anatomical-structure-tags.state';
import { ModelState } from '../../core/store/model/model.state';
import { PageState } from '../../core/store/page/page.state';
import { RegistrationState } from '../../core/store/registration/registration.state';
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
  /** Emits when the registration is expanded */
  readonly registrationExpanded = output<boolean>();

  /** Model state */
  protected readonly model = inject(ModelState);
  /** Registration state */
  protected readonly registration = inject(RegistrationState);
  /** Page state */
  protected readonly page = inject(PageState);
  /** AS tags state */
  protected readonly astags = inject(AnatomicalStructureTagState);
  /** Metadata modal service */
  protected readonly metadata = inject(MetadataService);

  /** Model position */
  protected readonly position$ = this.model.position$.pipe(
    map((p) => ({ x: Math.floor(p.x), y: Math.floor(p.y), z: Math.floor(p.z) })),
  );

  /** As tags */
  protected readonly tags = toSignal(this.astags.tags$, { initialValue: [] });
  /** All tags */
  protected readonly allTags = toSignal(this.astags.entitiesArray$, { initialValue: [] });
  /** Added tags */
  protected readonly addedTags = computed(() => this.tags().filter((tag) => tag.type === 'added'));
  /** Assigned tags */
  protected readonly assignedTags = computed(() => this.tags().filter((tag) => tag.type === 'assigned'));
  /** Removed tags */
  protected readonly removedTags = computed(() => this.allTags().filter((tag) => tag.type === 'removed'));

  /** Set the model default position */
  setDefaultPosition() {
    if (this.registration.snapshot.initialRegistration) {
      this.registration.resetPosition();
    } else {
      this.model.setDefaultPosition();
    }
  }
}
