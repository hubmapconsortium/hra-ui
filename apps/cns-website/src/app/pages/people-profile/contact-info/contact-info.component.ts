import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { AnyRole } from '../../../schemas/roles.schema';

/** Contact information for a person */
export interface ContactInfo {
  /** Profile picture filename */
  image: string;
  /** Person's role information */
  role?: AnyRole;
}

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
  /** Contact information to display */
  readonly contactInfo = input.required<ContactInfo>();
}
