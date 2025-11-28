import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { ChipsModule } from '@hra-ui/design-system/chips';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import {
  TableOfContentsLayoutComponent,
  TableOfContentsLayoutHeaderComponent,
} from '@hra-ui/design-system/layouts/table-of-contents';
import { MarkdownModule } from 'ngx-markdown';
import { map } from 'rxjs';
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
  /** Activated route for accessing resolved data */
  private readonly route = inject(ActivatedRoute);

  /**
   * Profile data from route resolver
   * Data is fetched from external YAML source based on slug parameter
   */
  readonly profileData = toSignal(
    this.route.data.pipe(
      map((data) => {
        const profileData = data['data'] as PeopleProfileData;
        return {
          ...profileData,
          breadcrumbs: [
            { name: 'Home', route: '/' },
            { name: 'People', route: '/people' },
            { name: profileData.name },
          ] as BreadcrumbItem[],
        };
      }),
    ),
    { requireSync: true },
  );

  /** Primary role computed from profile data */
  readonly primaryRole = computed<Role | undefined>(() => this.profileData()?.roles?.[0]);

  /** Contact info computed for the sidebar */
  readonly contactInfo = computed<ContactInfo>(() => ({
    image: this.profileData()?.image ?? '',
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
