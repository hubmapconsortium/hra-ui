import { NgModule } from '@angular/core';
import { MockContactService } from './contact/contact.mock';
import { ContactService } from './contact/contact.service';
import { MockTissueLibraryService } from './tissue-library/tissue-library.mock';
import { TissueLibraryService } from './tissue-library/tissue-library.service';
import { TissueFtuService } from './tissue-ftu/tissue-ftu.service';
import { MockTissueFtuService } from './tissue-ftu/tissue-ftu.mock';

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
  ],
})
export class HraServiceModule {}
