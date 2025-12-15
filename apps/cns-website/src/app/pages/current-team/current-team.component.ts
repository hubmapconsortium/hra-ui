import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ProfileCardComponent } from '@hra-ui/design-system/cards/profile-card';
import { FilterMenuComponent, FilterOptionCategory } from '@hra-ui/design-system/filter-menu';
import { IconsModule } from '@hra-ui/design-system/icons';
import { NoResultsIndicatorComponent } from '@hra-ui/design-system/indicators/no-results-indicator';
import { SearchFilterComponent } from '@hra-ui/design-system/search-filter';
import { SearchListOption } from '@hra-ui/design-system/search-list';
import { PeopleProfileData } from '../../schemas/people-profile/people-profile.schema';

/** Team member data type (alias for PeopleProfileData) */
export type TeamMember = PeopleProfileData;

/**
 * Page component for displaying current team members
 */
@Component({
  selector: 'cns-current-team',
  imports: [
    HraCommonModule,
    SearchFilterComponent,
    ProfileCardComponent,
    NoResultsIndicatorComponent,
    ButtonsModule,
    FilterMenuComponent,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    IconsModule,
  ],
  templateUrl: './current-team.component.html',
  styleUrl: './current-team.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentTeamComponent {
  /**
   * Team members data from route resolver
   */
  readonly data = input.required<PeopleProfileData[]>();

  /** Search query signal */
  readonly searchQuery = signal<string>('');

  /** Team type selection (current or former) */
  readonly teamType = signal<'current' | 'former'>('current');

  /** Sort by option */
  readonly sortBy = signal<'hierarchical' | 'lastNameAsc' | 'lastNameDesc' | 'startYearNewest' | 'startYearOldest'>(
    'hierarchical',
  );

  /** Group by option */
  readonly groupBy = signal<string | null>(null);

  /** Filter menu filters */
  readonly filters = signal<FilterOptionCategory<SearchListOption>[]>([
    {
      id: 'roles',
      label: 'Roles',
      options: [
        { id: 'collaborators', label: 'Collaborators' },
        { id: 'faculty', label: 'Faculty' },
        { id: 'postdocs', label: 'Postdocs' },
        { id: 'phd-students', label: 'PhD students' },
        { id: 'staff', label: 'Staff' },
        { id: 'students', label: 'Students' },
      ],
      selected: [],
    },
    {
      id: 'startYear',
      label: 'Start year',
      options: [
        { id: '2020', label: '2020+' },
        { id: '2015', label: '2015-2019' },
        { id: '2010', label: '2010-2014' },
        { id: '2005', label: '2005-2009' },
        { id: 'before2005', label: 'Before 2005' },
      ],
      selected: [],
    },
  ]);

  /** Filtered and sorted team members based on all filters */
  readonly filteredMembers = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const teamType = this.teamType();
    const sortBy = this.sortBy();
    const filterCategories = this.filters();
    let members = this.data();

    // Filter by team type (current vs former)
    members = members.filter((member) => {
      const isCurrent = member.roles.some((role) => role.dateEnd === null);
      return teamType === 'current' ? isCurrent : !isCurrent;
    });

    // Filter by roles
    const roleFilters = filterCategories.find((f) => f.id === 'roles')?.selected ?? [];
    if (roleFilters.length > 0) {
      members = members.filter((member) => {
        const role = member.roles[0];
        if (!role) {
          return false;
        }

        let titleText = '';
        switch (role.type) {
          case 'member':
            titleText = role.title?.toLowerCase() || '';
            break;
          case 'student':
            titleText = `${role.degree} ${role.topic}`.toLowerCase();
            break;
          case 'collaborator':
            titleText = `collaborator ${role.project}`.toLowerCase();
            break;
        }

        return roleFilters.some((filter) => titleText.includes(filter.id.toLowerCase()));
      });
    }

    // Filter by start year
    const startYearFilters = filterCategories.find((f) => f.id === 'startYear')?.selected ?? [];
    if (startYearFilters.length > 0) {
      members = members.filter((member) => {
        const startDate = member.roles[0]?.dateStart;
        if (!startDate) {
          return false;
        }

        const year = new Date(startDate).getFullYear();
        return startYearFilters.some((filter) => {
          switch (filter.id) {
            case '2020':
              return year >= 2020;
            case '2015':
              return year >= 2015 && year < 2020;
            case '2010':
              return year >= 2010 && year < 2015;
            case '2005':
              return year >= 2005 && year < 2010;
            case 'before2005':
              return year < 2005;
            default:
              return false;
          }
        });
      });
    }

    // Filter by search query
    if (query) {
      members = members.filter((member) => {
        const memberTitle = this.getMemberTitle(member).toLowerCase();
        return (
          member.name.toLowerCase().includes(query) ||
          memberTitle.includes(query) ||
          member.lastName.toLowerCase().includes(query)
        );
      });
    }

    // Sort members
    members = [...members].sort((a, b) => {
      switch (sortBy) {
        case 'lastNameAsc':
          return a.lastName.localeCompare(b.lastName);
        case 'lastNameDesc':
          return b.lastName.localeCompare(a.lastName);
        case 'startYearNewest': {
          const dateA = a.roles[0]?.dateStart ? new Date(a.roles[0].dateStart).getTime() : 0;
          const dateB = b.roles[0]?.dateStart ? new Date(b.roles[0].dateStart).getTime() : 0;
          return dateB - dateA; // Most recent first
        }
        case 'startYearOldest': {
          const dateA = a.roles[0]?.dateStart ? new Date(a.roles[0].dateStart).getTime() : 0;
          const dateB = b.roles[0]?.dateStart ? new Date(b.roles[0].dateStart).getTime() : 0;
          return dateA - dateB; // Oldest first
        }
        default: {
          // Hierarchical (by displayOrder) - only available for member roles
          const roleA = a.roles[0];
          const roleB = b.roles[0];
          const orderA = roleA?.type === 'member' && roleA.displayOrder != null ? roleA.displayOrder : 999;
          const orderB = roleB?.type === 'member' && roleB.displayOrder != null ? roleB.displayOrder : 999;
          return orderA - orderB;
        }
      }
    });

    return members;
  });

  /** Total count of team members */
  readonly totalCount = computed(() => this.data().length);

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
    this.filters.update((filters) => filters.map((f) => ({ ...f, selected: [] })));
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
    const role = member.roles[0];
    if (!role) {
      return '';
    }

    switch (role.type) {
      case 'member':
        return role.title || '';
      case 'student':
        return `${role.degree} Student - ${role.topic}`;
      case 'collaborator':
        return `Collaborator - ${role.project}`;
      default:
        return '';
    }
  }
}
