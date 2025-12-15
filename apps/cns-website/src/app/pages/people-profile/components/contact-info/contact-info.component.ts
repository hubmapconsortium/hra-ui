import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';

/** Role information for a person */
export interface Role {
  /** Role type */
  type: 'member' | 'student' | 'collaborator';
  /** Job title */
  title?: string;
  /** Project name (for collaborators) */
  project?: string;
  /** Research topic (for students) */
  topic?: string;
  /** Degree (for students) */
  degree?: string;
  /** Department */
  department?: string;
  /** Display order */
  displayOrder?: number | null;
  /** Office location */
  office?: string;
  /** Phone number */
  phone?: string;
  /** Fax number */
  fax?: string;
  /** Email address */
  email?: string;
  /** Education information */
  education?: string;
  /** Background information */
  background?: string;
  /** Interests */
  interests?: string;
  /** Start date */
  dateStart: string;
  /** End date (null if current) */
  dateEnd: string | null;
}

/** Contact information for a person */
export interface ContactInfo {
  /** Profile picture filename */
  image: string;
  /** Person's role information */
  role?: Role;
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
