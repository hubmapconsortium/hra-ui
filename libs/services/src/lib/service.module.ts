import { NgModule } from '@angular/core';
import { ContactImplService } from './contact/contact.impl';
import { ContactService } from './contact/contact.service';
import { FTU_DATA_IMPL_ENDPOINTS, FtuDataImplService } from './ftu-data/ftu-data.impl';
import { FtuDataService } from './ftu-data/ftu-data.service';
import { ReplaySubject } from 'rxjs';

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
      useValue: new ReplaySubject(1),
    },
  ],
})
export class HraServiceModule {}
