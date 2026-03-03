import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { AnyRole } from '../../../schemas/roles.schema';

/**
 * Component displaying contact information sidebar
 */
@Component({
  selector: 'cns-contact-info',
  imports: [HraCommonModule, PageSectionComponent],
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactInfoComponent {
  /** Profile picture URL */
  readonly image = input.required<string | undefined>();

  /** Primary role information */
  readonly role = input.required<AnyRole | undefined>();
}
