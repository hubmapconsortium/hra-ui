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
  readonly registrationExpanded = output<boolean>();

  protected readonly model = inject(ModelState);
  protected readonly registration = inject(RegistrationState);
  protected readonly page = inject(PageState);
  protected readonly astags = inject(AnatomicalStructureTagState);
  protected readonly metadata = inject(MetadataService);

  protected readonly position$ = this.model.position$.pipe(
    map((p) => ({ x: Math.floor(p.x), y: Math.floor(p.y), z: Math.floor(p.z) })),
  );

  protected readonly tags = toSignal(this.astags.tags$, { initialValue: [] });
  protected readonly allTags = toSignal(this.astags.entitiesArray$, { initialValue: [] });
  protected readonly addedTags = computed(() => this.tags().filter((tag) => tag.type === 'added'));
  protected readonly assignedTags = computed(() => this.tags().filter((tag) => tag.type === 'assigned'));
  protected readonly removedTags = computed(() => this.allTags().filter((tag) => tag.type === 'removed'));

  setDefaultPosition() {
    if (this.registration.snapshot.initialRegistration) {
      this.registration.resetPosition();
    } else {
      this.model.setDefaultPosition();
    }
  }
}
