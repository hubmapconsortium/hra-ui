import { NgModule } from '@angular/core';
import { ContactImplService } from './contact/contact.impl';
import { ContactService } from './contact/contact.service';
import { FTU_DATA_IMPL_ENDPOINTS, FtuDataImplService } from './ftu-data/ftu-data.impl';
import { FtuDataService } from './ftu-data/ftu-data.service';

@NgModule({
  providers: [
    {
      provide: ContactService,
      useExisting: ContactImplService,
    },
    {
      provide: FtuDataService,
      useExisting: FtuDataImplService,
    },
    {
      provide: FTU_DATA_IMPL_ENDPOINTS,
      useValue: {
        illustrations: 'assets/TEMP/2d-ftu-illustrations.jsonld',
        summaries: 'assets/TEMP/ftu-cell-summaries.jsonld',
        datasets: 'assets/TEMP/ftu-datasets.jsonld',
        baseHref: '',
      },
    },
  ],
})
export class HraServiceModule {}
