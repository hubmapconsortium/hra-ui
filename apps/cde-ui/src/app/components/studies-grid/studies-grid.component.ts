import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AnalyticsModule } from '@hra-ui/common/analytics';
import { LinkDirective } from '@hra-ui/common/router-ext';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { CollectionCardActionComponent, CollectionCardComponent } from '@hra-ui/design-system/cards/collection-card';
import { GridContainerComponent } from '@hra-ui/design-system/content-templates/grid-container';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { injectRouteData } from 'ngxtension/inject-route-data';
import { Studies } from '../../schemas/studies/studies.schema';
import { STUDIES_DATA_KEY } from '../../shared/resolvers/study.resolver';
import { SourceDataMenuComponent } from './source-data-menu/source-data-menu.component';

/** Studies grid wrapper component that displays featured spatial omics studies */
@Component({
  selector: 'cde-studies-grid',
  imports: [
    AnalyticsModule,
    ButtonsModule,
    CollectionCardActionComponent,
    CollectionCardComponent,
    GridContainerComponent,
    MatIconModule,
    MatMenuModule,
    PlainTooltipDirective,
    LinkDirective,
    SourceDataMenuComponent,
  ],
  templateUrl: './studies-grid.component.html',
  styleUrl: './studies-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudiesGridComponent {
  readonly dataName = input(STUDIES_DATA_KEY);

  readonly studies = computed(() => {
    const data = this.routeData();
    const key = this.dataName();
    return (data?.[key] as Studies).studies ?? [];
  });

  private readonly routeData = injectRouteData.global<Record<string, Studies>>();
}
