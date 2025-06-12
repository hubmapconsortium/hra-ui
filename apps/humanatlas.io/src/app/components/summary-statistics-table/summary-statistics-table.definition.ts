import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import { SummaryStatisticsTableComponent } from './summary-statistics-table.component';
import { SummaryStatisticsTableSchema } from './summary-statistics-table.schema';

/** Content template definition for SummaryStatisticsTableComponent */
export const SummaryStatisticsTableDef: ContentTemplateDef<SummaryStatisticsTableComponent> = {
  component: SummaryStatisticsTableComponent,
  spec: SummaryStatisticsTableSchema,
};
