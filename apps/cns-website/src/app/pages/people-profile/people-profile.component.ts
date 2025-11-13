import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { ChipsModule } from '@hra-ui/design-system/chips';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { TableOfContentsLayoutComponent } from '@hra-ui/design-system/layouts/table-of-contents';
import { MarkdownModule } from 'ngx-markdown';
import { ContactInfo, ContactInfoComponent } from './components/contact-info/contact-info.component';

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
  /** Person's name */
  name: string;
  /** Short description */
  description: string;
  /** Role tags (e.g., Faculty, Center Director) */
  tags: string[];
  /** Contact information */
  contactInfo: ContactInfo;
  /** Profile sections */
  sections: ProfileSection[];
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
    ChipsModule,
    MarkdownModule,
    ContactInfoComponent,
  ],
  templateUrl: './people-profile.component.html',
  styleUrl: './people-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleProfileComponent {
  /** Profile data to display */
  readonly profileData = signal<PeopleProfileData>({
    name: 'Katy Börner',
    description: 'Short description ideally less than 125 characters.',
    tags: ['Faculty', 'Center Director'],
    breadcrumbs: [{ name: 'Home', route: '/' }, { name: 'People', route: '/people' }, { name: 'Katy Börner' }],
    contactInfo: {
      pictureUrl: '/assets/people/katy-borner.png',
      office: 'Luddy Hall 4018',
      phone: '812.855.3256',
      fax: '812.855.6166',
      email: 'katy@iu.edu',
    },
    sections: [
      {
        tagline: 'Education',
        anchor: 'education',
        content:
          'Katy holds a MS in Electrical Engineering from the University of Technology in Leipzig, 1991 and a Ph.D. in Computer Science from the University of Kaiserslautern, 1997.',
      },
      {
        tagline: 'Background',
        anchor: 'background',
        content: `Katy Börner is the Victor H. Yngve Distinguished Professor of Engineering and Information Science in the Department of Intelligent Systems Engineering, School of Informatics and Computing, Core Faculty of Cognitive Science, and Founding Director of the Cyberinfrastructure for Network Science Center at Indiana University in Bloomington, IN. She is a Visiting Professor at the Royal Netherlands Academy of Arts and Sciences (KNAW) in The Netherlands and a curator of the International Places & Spaces: Mapping Science exhibit. She was elected as an American Association for the Advancement of Science (AAAS) Fellow in 2012 and as an Alexander von Humboldt Fellow in 2017.`,
      },
      {
        tagline: 'Personal',
        anchor: 'personal',
        content: "See more on Katy's [personal website](https://cns.iu.edu/~katy).",
      },
    ],
  });
}
