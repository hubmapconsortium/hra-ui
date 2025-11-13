import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';

/** Contact information for a person */
export interface ContactInfo {
  /** Profile picture URL */
  pictureUrl: string;
  /** Office location */
  office?: string;
  /** Phone number */
  phone?: string;
  /** Fax number */
  fax?: string;
  /** Email address */
  email?: string;
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
