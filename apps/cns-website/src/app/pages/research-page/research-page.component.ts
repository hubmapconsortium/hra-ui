import { ChangeDetectionStrategy, Component, computed, effect, inject, input, viewChild } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
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
import { PeopleData } from '../../schemas/people.schema';
import { PublicationTypesData } from '../../schemas/publication-types.schema';
import { ResearchData } from '../../schemas/research.schema';
import { TagId, TagsData } from '../../schemas/tags.schema';
import { SidebarStore } from '../../state/sidebar/sidebar.store';
import { getImageUrl } from '../../utils/research-item-images';
import { ResearchStore } from './state/research.store';

/**
 * Research page with filtering, sorting, and dual view modes.
 * Displays research outputs with multi-faceted filtering and query parameter sync.
 */
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
  /** News research data */
  readonly news = input.required<ResearchData>();
  /** Publications research data */
  readonly publications = input.required<ResearchData>();
  /** People data for filtering and display */
  readonly people = input.required<PeopleData>();
  /** Publication type definitions */
  readonly publicationTypes = input.required<PublicationTypesData>();
  /** Tags data from resolver */
  readonly tags = input.required<TagsData>();

  /** Research store for state management */
  protected readonly store = inject(ResearchStore);
  /** Sidebar store for managing sidebar visibility */
  protected readonly sidebarStore = inject(SidebarStore);

  /** Sidebar component reference */
  private readonly sidebar = viewChild.required(MatSidenav);

  /** Combined research items from news and publications */
  private readonly researchItems = computed(() => [...this.news(), ...this.publications()]);

  /** Utility to get image URL for a research item */
  protected readonly getImageUrl = getImageUrl;

  /** Initializes store with data and registers sidebar */
  constructor() {
    this.store.setResearchItems(this.researchItems);
    this.store.setPeopleItems(this.people);
    this.store.setPublicationTypes(this.publicationTypes);

    effect((onCleanup) => {
      this.sidebarStore.setSidebar(this.sidebar());
      onCleanup(() => this.sidebarStore.clearSidebar());
    });
  }

  /** Gets tags map for given list of tag slugs */
  getTagsMap(slugs: TagId[]): Map<TagId, { name: string; description: string }> {
    const allTags = new Map(this.tags().map((tag) => [tag.slug, { name: tag.name, description: tag.description }]));
    return new Map(
      slugs.map((slug) => {
        const tag = allTags.get(slug) ?? { name: slug, description: '' };
        return [slug, tag];
      }),
    );
  }
}
