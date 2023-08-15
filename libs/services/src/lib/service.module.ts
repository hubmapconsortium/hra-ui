import { NgModule } from '@angular/core';
import { MockContactService } from './contact/contact.mock';
import { ContactService } from './contact/contact.service';
import { FTU_DATA_IMPL_ENDPOINTS, FtuDataImplService } from './ftu-data/ftu-data.impl';
import { FtuDataService } from './ftu-data/ftu-data.service';
import { MockTissueFtuService } from './tissue-ftu/tissue-ftu.mock';
import { TissueFtuService } from './tissue-ftu/tissue-ftu.service';
import { MockTissueLibraryService } from './tissue-library/tissue-library.mock';
import { TissueLibraryService } from './tissue-library/tissue-library.service';

@NgModule({
  providers: [
    // TODO replace with real services
    {
      provide: ContactService,
      useExisting: MockContactService,
    },
    {
      provide: TissueLibraryService,
      useExisting: MockTissueLibraryService,
    },
    {
      provide: TissueFtuService,
      useExisting: MockTissueFtuService,
    },
    {
      provide: FtuDataService,
      useExisting: FtuDataImplService,
    },
    {
      provide: FTU_DATA_IMPL_ENDPOINTS,
      useValue: {
        illustrations: 'assets/TEMP/2d-ftu-illustrations.jsonld',
        summaries: '',
        datasets: 'assets/TEMP/ftu-datasets.jsonld',
      },
    },
  ],
})
export class HraServiceModule {}
