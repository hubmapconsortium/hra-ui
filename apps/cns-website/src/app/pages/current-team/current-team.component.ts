import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ProfileCardComponent } from '@hra-ui/design-system/cards/profile-card';
import { SectionLinkComponent } from '@hra-ui/design-system/content-templates/section-link';
import { FilterMenuComponent } from '@hra-ui/design-system/filter-menu';
import { GalleryGridComponent, GalleryGridItemDirective } from '@hra-ui/design-system/gallery-grid';
import { IconsModule } from '@hra-ui/design-system/icons';
import { NoResultsIndicatorComponent } from '@hra-ui/design-system/indicators/no-results-indicator';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { SearchFilterComponent } from '@hra-ui/design-system/search-filter';
import { PeopleProfileData } from '../../schemas/people-profile/people-profile.schema';
import { FooterComponent } from '../../components/footer/footer.component';
import { CurrentTeamStore } from './state/current-team.store';
import { TeamType } from './state/with-filters.feature';

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
    GalleryGridComponent,
    GalleryGridItemDirective,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule,
    IconsModule,
    FooterComponent,
    ScrollingModule,
    SectionLinkComponent,
  ],
  templateUrl: './current-team.component.html',
  styleUrl: './current-team.component.scss',
  providers: [CurrentTeamStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentTeamComponent {
  /**
   * Team members data from route resolver
   */
  readonly data = input.required<PeopleProfileData>();

  /**
   * Team type from query parameter
   */
  readonly type = input('current', {
    transform: (value?: string): TeamType => (value === 'past' ? 'past' : 'current'),
  });

  /** Store for managing team member state and filters */
  protected readonly store = inject(CurrentTeamStore);

  /** Gender neutral placeholder image for members without pictures */
  readonly placeholderImage = '/assets/placeholder.png';

  /**
   * Initializes the component and store with route data
   * - Sets people data from route resolver
   * - Sets team type from query parameter (current/past)
   */
  constructor() {
    this.store.setPeople(this.data);
    this.store.setTeam(this.type);
  }
}
