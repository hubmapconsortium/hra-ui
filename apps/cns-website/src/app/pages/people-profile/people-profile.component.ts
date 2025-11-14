import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { ChipsModule } from '@hra-ui/design-system/chips';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import {
  TableOfContentsLayoutComponent,
  TableOfContentsLayoutHeaderComponent,
} from '@hra-ui/design-system/layouts/table-of-contents';
import { MarkdownModule } from 'ngx-markdown';
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

/** People profile data */
export interface PeopleProfileData {
  /** Person's full name */
  name: string;
  /** Person's last name */
  lastName: string;
  /** Profile picture filename */
  image: string;
  /** URL-friendly identifier */
  slug: string;
  /** Person's roles */
  roles: Role[];
  /** Breadcrumb items */
  breadcrumbs?: BreadcrumbItem[];
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
   * Profile data to display
   * TODO: This will be populated from route resolver when JSON data is available
   * Example route config:
   * {
   *   path: 'people/:slug',
   *   component: PeopleProfileComponent,
   *   resolve: {
   *     data: createJsonSpecResolver('assets/content/people/:slug/data.json', PeopleProfileDataSchema)
   *   }
   * }
   */
  readonly profileData = signal<PeopleProfileData>({
    name: 'Katy Börner',
    lastName: 'Börner',
    image: '/assets/people/katy-borner.png',
    slug: 'katy-borner',
    breadcrumbs: [{ name: 'Home', route: '/' }, { name: 'People', route: '/people' }, { name: 'Katy Börner' }],
    roles: [
      {
        type: 'member',
        title: 'Victor H. Yngve Distinguished Professor',
        displayOrder: 1,
        office: 'Luddy Hall 4018',
        phone: '812.855.3256',
        fax: '812.855.6166',
        email: 'katy@iu.edu',
        education:
          'Katy holds a MS in Electrical Engineering from the University of Technology in Leipzig, 1991 and a Ph.D. in Computer Science from the University of Kaiserslautern, 1997.',
        background: `Katy Börner is the Victor H. Yngve Distinguished Professor of Engineering and Information Science in the Department of Intelligent Systems Engineering, School of Informatics and Computing, Core Faculty of Cognitive Science, and Founding Director of the Cyberinfrastructure for Network Science Center at Indiana University in Bloomington, IN. She is a Visiting Professor at the Royal Netherlands Academy of Arts and Sciences (KNAW) in The Netherlands and a curator of the International Places & Spaces: Mapping Science exhibit. She was elected as an American Association for the Advancement of Science (AAAS) Fellow in 2012 and as an Alexander von Humboldt Fellow in 2017.`,
        interests: "See more on Katy's personal website at https://cns.iu.edu/~katy",
        dateStart: '2005-01-01',
        dateEnd: null,
      },
    ],
  });

  /** Primary role computed from profile data */
  readonly primaryRole = computed<Role | undefined>(() => this.profileData().roles[0]);

  /** Contact info computed for the sidebar */
  readonly contactInfo = computed<ContactInfo>(() => ({
    image: this.profileData().image,
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
