import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { ChipsModule } from '@hra-ui/design-system/chips';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import {
  TableOfContentsLayoutComponent,
  TableOfContentsLayoutHeaderComponent,
} from '@hra-ui/design-system/layouts/table-of-contents';
import { MarkdownModule } from 'ngx-markdown';
import { PeopleProfileData } from '../../resolvers/people-profile/people-profile.resolver';
import { ContactInfo, ContactInfoComponent, Role } from './components/contact-info/contact-info.component';

/** Profile section data */
export interface ProfileSection {
  /** Section title/tagline */
  tagline: string;
  /** Section anchor id */
  anchor: string;
  /** Section content in markdown */
  content: string;
}

/**
 * Page component for displaying people profiles
 */
@Component({
  selector: 'cns-people-profile',
  imports: [
    HraCommonModule,
    PageSectionComponent,
    TableOfContentsLayoutComponent,
    TableOfContentsLayoutHeaderComponent,
    ChipsModule,
    MarkdownModule,
    ContactInfoComponent,
  ],
  templateUrl: './people-profile.component.html',
  styleUrl: './people-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleProfileComponent {
  /**
   * Profile data from route resolver
   */
  readonly data = input.required<PeopleProfileData>();

  /** Primary role computed from profile data */
  readonly primaryRole = computed<Role | undefined>(() => this.data().roles?.[0]);

  /** Contact info computed for the sidebar */
  readonly contactInfo = computed<ContactInfo>(() => ({
    image: this.data().image ?? '',
    role: this.primaryRole(),
  }));

  /** Role tags computed for display */
  readonly tags = computed(() => {
    const role = this.primaryRole();
    if (!role) {
      return [];
    }

    const tags: string[] = [];
    if (role.title) {
      tags.push(role.title);
    }
    if (role.type === 'member') {
      tags.push('Faculty');
    }
    return tags;
  });

  /** Profile sections computed from role data */
  readonly sections = computed<ProfileSection[]>(() => {
    const role = this.primaryRole();
    if (!role) {
      return [];
    }

    const sections: ProfileSection[] = [];

    if (role.education) {
      sections.push({
        tagline: 'Education',
        anchor: 'education',
        content: role.education,
      });
    }

    if (role.background) {
      sections.push({
        tagline: 'Background',
        anchor: 'background',
        content: role.background,
      });
    }

    if (role.interests) {
      sections.push({
        tagline: 'Interests',
        anchor: 'interests',
        content: role.interests,
      });
    }

    return sections;
  });
}
