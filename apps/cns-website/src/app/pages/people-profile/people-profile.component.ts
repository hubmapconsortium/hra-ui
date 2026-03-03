import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { Breakpoints, watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { HraCommonModule } from '@hra-ui/common';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { ChipsModule } from '@hra-ui/design-system/chips';
import { MarkdownComponent } from '@hra-ui/design-system/content-templates/markdown';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import {
  TableOfContentsLayoutComponent,
  TableOfContentsLayoutHeaderComponent,
} from '@hra-ui/design-system/layouts/table-of-contents';
import { FooterComponent } from '../../components/footer/footer.component';
import { PeopleItem } from '../../schemas/people.schema';
import { getRefinedRoleTypeLabel, refineRoleType } from '../../utils/refined-roles';
import { ContactInfoComponent } from './contact-info/contact-info.component';

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
    ChipsModule,
    ContactInfoComponent,
    FooterComponent,
    MarkdownComponent,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    PageSectionComponent,
    TableOfContentsLayoutComponent,
    TableOfContentsLayoutHeaderComponent,
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

  /** Whether the current screen size matches mobile breakpoint */
  protected readonly isMobile = watchBreakpoint(Breakpoints.Mobile);

  /** Breadcrumbs computed for navigation */
  protected readonly breadcrumbs = computed((): BreadcrumbItem[] => [
    { name: 'Home', route: '/' },
    { name: 'People', route: '/people' },
    { name: this.data().name },
  ]);

  /** Primary role computed from profile data */
  protected readonly primaryRole = computed(() => this.data().roles?.[0]);

  /** Whether contact info is available for display */
  protected readonly hasContactInfo = computed(() => {
    if (this.data().image) {
      return true;
    }

    const role = this.primaryRole();
    if (!role || role.type !== 'member') {
      return false;
    }

    const { email, fax, office, phone } = role;
    return !!(email || fax || office || phone);
  });

  /** Role tags computed for display */
  protected readonly tags = computed(() => {
    const role = this.primaryRole();
    if (!role) {
      return [];
    }

    const tags: string[] = [];
    if (role.type === 'member') {
      if (role.title) {
        tags.push(role.title);
      }
    }

    tags.push(getRefinedRoleTypeLabel(refineRoleType(role)));

    return tags;
  });

  /** Profile sections computed from role data */
  protected readonly sections = computed<ProfileSection[]>(() => {
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
