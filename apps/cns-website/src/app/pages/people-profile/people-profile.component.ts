import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { ChipsModule } from '@hra-ui/design-system/chips';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import {
  TableOfContentsLayoutComponent,
  TableOfContentsLayoutHeaderComponent,
} from '@hra-ui/design-system/layouts/table-of-contents';
import { MarkdownModule } from 'ngx-markdown';
import { PeopleItem } from '../../schemas/people.schema';
import { ContactInfo, ContactInfoComponent } from './contact-info/contact-info.component';

/** Profile section data */
interface ProfileSection {
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
  readonly data = input.required<PeopleItem>();

  /** Primary role computed from profile data */
  readonly primaryRole = computed(() => this.data().roles?.[0]);

  /** Contact info computed for the sidebar */
  readonly contactInfo = computed<ContactInfo>(() => ({
    image: this.data().image || '',
    role: this.data().roles?.[0],
  }));

  /** Role tags computed for display */
  readonly tags = computed(() => {
    const role = this.primaryRole();
    if (!role) {
      return [];
    }

    const tags: string[] = [];
    if (role.type === 'member') {
      if (role.title) {
        tags.push(role.title);
      }

      tags.push('Faculty');
    }
    return tags;
  });

  /** Breadcrumbs computed for navigation */
  readonly breadcrumbs = computed(() => [
    { name: 'Home', route: '/' },
    { name: 'People', route: '/people' },
    { name: this.data().name },
  ]);

  /** Profile sections computed from role data */
  readonly sections = computed<ProfileSection[]>(() => {
    const role = this.primaryRole();
    if (!role) {
      return [];
    }

    const sections: ProfileSection[] = [];

    if (role.type === 'member') {
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
    }

    return sections;
  });
}
