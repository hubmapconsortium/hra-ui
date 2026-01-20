import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
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
import { HeaderEventsService } from '../../components/header/header.component';
import { ResearchPageData } from '../../schemas/research/research.schema';
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

  readonly headerEvents = inject(HeaderEventsService);
  protected readonly store = inject(ResearchStore);

  protected readonly isWideScreen = watchBreakpoint('(min-width: 1100px)');

  constructor() {
    this.store.setResearchItems(this.data);

    effect(() => {
      this.headerEvents.menuState.set(this.isWideScreen());
    });
  }
}
