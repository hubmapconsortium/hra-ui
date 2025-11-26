import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ProfileCardComponent } from '@hra-ui/design-system/cards/profile-card';
import { NoResultsIndicatorComponent } from '@hra-ui/design-system/indicators/no-results-indicator';
import { SearchFilterComponent } from '@hra-ui/design-system/search-filter';

/** Role information for a team member */
export interface TeamMemberRole {
  /** Role type (e.g., 'member', 'affiliate') */
  type: string;
  /** Job title/position */
  title: string;
  /** Display order priority */
  displayOrder: number;
  /** Office location */
  office?: string;
  /** Phone number */
  phone?: string;
  /** Fax number */
  fax?: string;
  /** Email address */
  email?: string;
  /** Educational background */
  education?: string;
  /** Professional background/bio */
  background?: string;
  /** Research interests */
  interests?: string;
  /** Role start date */
  dateStart: string | null;
  /** Role end date (null if current) */
  dateEnd: string | null;
}

/** Team member data interface matching PeopleProfileData structure */
export interface TeamMember {
  /** Member's full name */
  name: string;
  /** Member's last name for sorting */
  lastName: string;
  /** Profile picture URL */
  image: string;
  /** URL slug for profile page */
  slug: string;
  /** Array of roles (using first role's title for display) */
  roles: TeamMemberRole[];
}

/**
 * Page component for displaying current team members
 */
@Component({
  selector: 'cns-current-team',
  imports: [HraCommonModule, SearchFilterComponent, ProfileCardComponent, NoResultsIndicatorComponent, ButtonsModule],
  templateUrl: './current-team.component.html',
  styleUrl: './current-team.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentTeamComponent {
  /** Search query signal */
  readonly searchQuery = signal<string>('');

  /**
   * Team members data
   * TODO: This will be populated from a JSON data source when available
   */
  readonly teamMembers = signal<TeamMember[]>([
    {
      name: 'Katy Börner',
      lastName: 'Börner',
      image: '/assets/people/katy-borner.png',
      slug: 'katy-borner',
      roles: [
        {
          type: 'member',
          title: 'Faculty, Center Director',
          displayOrder: 1,
          dateStart: '2005-01-01',
          dateEnd: null,
        },
      ],
    },
    {
      name: 'Andreas Bueckle',
      lastName: 'Bueckle',
      image: '',
      slug: 'andreas-bueckle',
      roles: [
        {
          type: 'member',
          title: 'Research Lead, Faculty',
          displayOrder: 2,
          dateStart: null,
          dateEnd: null,
        },
      ],
    },
    {
      name: 'Bruce W. Herr II',
      lastName: 'Herr',
      image: '',
      slug: 'bruce-herr',
      roles: [
        {
          type: 'member',
          title: 'Technical Director',
          displayOrder: 3,
          dateStart: null,
          dateEnd: null,
        },
      ],
    },
    {
      name: 'Lisel Record',
      lastName: 'Record',
      image: '',
      slug: 'lisel-record',
      roles: [
        {
          type: 'member',
          title: 'Associate Director',
          displayOrder: 4,
          dateStart: null,
          dateEnd: null,
        },
      ],
    },
    {
      name: 'Daniel Bolin',
      lastName: 'Bolin',
      image: '',
      slug: 'daniel-bolin',
      roles: [
        {
          type: 'member',
          title: 'Senior Software Developer',
          displayOrder: 5,
          dateStart: null,
          dateEnd: null,
        },
      ],
    },
    {
      name: 'Mike Gallant',
      lastName: 'Gallant',
      image: '',
      slug: 'mike-gallant',
      roles: [
        {
          type: 'member',
          title: 'Assistant Director of IT',
          displayOrder: 6,
          dateStart: null,
          dateEnd: null,
        },
      ],
    },
    {
      name: 'Michael Glinda',
      lastName: 'Glinda',
      image: '',
      slug: 'michael-glinda',
      roles: [
        {
          type: 'member',
          title: 'Senior Research Analyst',
          displayOrder: 7,
          dateStart: null,
          dateEnd: null,
        },
      ],
    },
    {
      name: 'Yashvardhan Jain',
      lastName: 'Jain',
      image: '',
      slug: 'yashvardhan-jain',
      roles: [
        {
          type: 'member',
          title: 'Research Software Engineer - Machine Learning',
          displayOrder: 8,
          dateStart: null,
          dateEnd: null,
        },
      ],
    },
  ]);

  /** Filtered team members based on search query */
  readonly filteredMembers = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const members = this.teamMembers();

    if (!query) {
      return members;
    }

    return members.filter((member) => {
      const title = member.roles[0]?.title || '';
      return (
        member.name.toLowerCase().includes(query) ||
        title.toLowerCase().includes(query) ||
        member.lastName.toLowerCase().includes(query)
      );
    });
  });

  /** Total count of team members */
  readonly totalCount = computed(() => this.teamMembers().length);

  /** Count of filtered members */
  readonly viewingCount = computed(() => this.filteredMembers().length);

  /** Whether there are no results */
  readonly hasNoResults = computed(() => this.filteredMembers().length === 0);

  /** Gender neutral placeholder image for members without pictures */
  readonly placeholderImage = '/assets/placeholder.png';

  /**
   * Clear all filters and reset search
   */
  clearFilters(): void {
    this.searchQuery.set('');
  }

  /**
   * Get profile picture URL with fallback to placeholder
   */
  getProfilePicture(member: TeamMember): string {
    return member.image || this.placeholderImage;
  }

  /**
   * Get profile link
   */
  getProfileLink(member: TeamMember): string {
    return `/people/${member.slug}`;
  }

  /**
   * Get member's title from their first role
   */
  getMemberTitle(member: TeamMember): string {
    return member.roles[0]?.title || '';
  }
}
