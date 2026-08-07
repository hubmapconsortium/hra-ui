import { ChangeDetectionStrategy, Component, effect, inject, input, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { SectionLinkComponent } from '@hra-ui/design-system/content-templates/section-link';
import { FilterMenuComponent } from '@hra-ui/design-system/filter-menu';
import { GalleryGridComponent, GalleryGridItemDirective } from '@hra-ui/design-system/gallery-grid';
import { IconsModule } from '@hra-ui/design-system/icons';
import { NoResultsIndicatorComponent } from '@hra-ui/design-system/indicators/no-results-indicator';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { SearchFilterComponent } from '@hra-ui/design-system/search-filter';
import { NgScrollbar } from 'ngx-scrollbar';
import { CurrentTeamMemberCardComponent } from '../../components/current-team-member-card/current-team-member-card.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormerTeamMemberCardComponent } from '../../components/former-team-member-card/former-team-member-card.component';
import { PeopleData } from '../../schemas/people.schema';
import { ScrollbarStore } from '../../state/scrollbar/scrollbar.store';
import { SidebarStore } from '../../state/sidebar/sidebar.store';
import { CurrentTeamStore } from './state/current-team.store';

/**
 * Page component for displaying current team members
 */
@Component({
  selector: 'cns-current-team',
  imports: [
    HraCommonModule,
    ButtonsModule,
    CurrentTeamMemberCardComponent,
    FilterMenuComponent,
    FooterComponent,
    FormerTeamMemberCardComponent,
    FormsModule,
    GalleryGridComponent,
    GalleryGridItemDirective,
    IconsModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule,
    NoResultsIndicatorComponent,
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
  readonly data = input.required<PeopleData>();

  /** Store for managing team member state and filters */
  protected readonly store = inject(CurrentTeamStore);

  /** Sidebar store for managing sidebar state */
  protected readonly sidebarStore = inject(SidebarStore);
  /** Scrollbar store for managing viewport scrolling */
  protected readonly scrollbarStore = inject(ScrollbarStore);

  /** Reference to the sidebar component */
  private readonly sidebar = viewChild.required(MatSidenav);
  /** Scrollbar component reference */
  private readonly scrollbar = viewChild.required(NgScrollbar);

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

    effect((onCleanup) => {
      this.scrollbarStore.setScrollbar(this.scrollbar());
      onCleanup(() => this.scrollbarStore.clearScrollbar());
    });
  }
}
