import { ChangeDetectionStrategy, Component, effect, inject, input, viewChild } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
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
import { FooterComponent } from '../../components/footer/footer.component';
import { PeopleProfileData } from '../../schemas/people-profile/people-profile.schema';
import { SidebarStore } from '../../state/sidebar/sidebar.store';
import { CurrentTeamStore } from './state/current-team.store';
import { LinkDirective } from '@hra-ui/common/router-ext';

/**
 * Page component for displaying current team members
 */
@Component({
  selector: 'cns-current-team',
  imports: [
    HraCommonModule,
    ButtonsModule,
    FilterMenuComponent,
    FooterComponent,
    GalleryGridComponent,
    GalleryGridItemDirective,
    IconsModule,
    LinkDirective,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule,
    NoResultsIndicatorComponent,
    ProfileCardComponent,
    ScrollingModule,
    SearchFilterComponent,
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

  /** Store for managing team member state and filters */
  protected readonly store = inject(CurrentTeamStore);

  /** Sidebar store for managing sidebar state */
  protected readonly sidebarStore = inject(SidebarStore);

  /** Gender neutral placeholder image for members without pictures */
  protected readonly placeholderImage = '/assets/placeholder.png';

  /** Reference to the sidebar component */
  private readonly sidebar = viewChild.required(MatSidenav);

  /**
   * Initializes the component and store with route data
   * - Sets people data from route resolver
   */
  constructor() {
    this.store.setPeople(this.data);

    effect((onCleanup) => {
      this.sidebarStore.setSidebar(this.sidebar());
      onCleanup(() => this.sidebarStore.clearSidebar());
    });
  }
}
