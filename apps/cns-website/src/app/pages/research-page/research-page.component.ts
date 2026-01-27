import { ChangeDetectionStrategy, Component, effect, inject, input, viewChild } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { CardsModule } from '@hra-ui/design-system/cards';
import { ListViewComponent } from '@hra-ui/design-system/content-templates/list-view';
import { SectionLinkComponent } from '@hra-ui/design-system/content-templates/section-link';
import { FilterMenuComponent } from '@hra-ui/design-system/filter-menu';
import { GalleryGridComponent, GalleryGridItemDirective } from '@hra-ui/design-system/gallery-grid';
import { IconsModule } from '@hra-ui/design-system/icons';
import { EndOfResultsIndicatorComponent } from '@hra-ui/design-system/indicators/end-of-results';
import { NoResultsIndicatorComponent } from '@hra-ui/design-system/indicators/no-results-indicator';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { SearchFilterComponent } from '@hra-ui/design-system/search-filter';
import { FooterComponent } from '../../components/footer/footer.component';
import { PeopleResearchItem, PublicationTypes, ResearchPageData } from '../../schemas/research/research.schema';
import { SidebarStore } from '../../state/sidebar/sidebar.store';
import { ResearchStore } from './state/research.store';

@Component({
  selector: 'cns-research-page',
  imports: [
    HraCommonModule,
    ButtonsModule,
    CardsModule,
    EndOfResultsIndicatorComponent,
    FilterMenuComponent,
    FooterComponent,
    GalleryGridComponent,
    GalleryGridItemDirective,
    IconsModule,
    ListViewComponent,
    MatDivider,
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule,
    NoResultsIndicatorComponent,
    SearchFilterComponent,
    SectionLinkComponent,
    ScrollingModule,
  ],
  templateUrl: './research-page.component.html',
  styleUrl: './research-page.component.scss',
  providers: [ResearchStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResearchPageComponent {
  readonly data = input.required<ResearchPageData>();
  readonly peopleData = input.required<PeopleResearchItem[]>();
  readonly pubTypes = input.required<PublicationTypes>();

  protected readonly store = inject(ResearchStore);
  protected readonly route = inject(ActivatedRoute);
  /** Sidebar store for managing sidebar state */
  protected readonly sidebarStore = inject(SidebarStore);

  /** Reference to the sidebar component */
  private readonly sidebar = viewChild.required(MatSidenav);
  constructor() {
    this.store.setResearchItems(this.data);
    this.store.setPeopleItems(this.peopleData);
    this.store.setPublicationTypes(this.pubTypes);

    effect((onCleanup) => {
      this.sidebarStore.setSidebar(this.sidebar());
      onCleanup(() => this.sidebarStore.clearSidebar());
    });
  }
}
