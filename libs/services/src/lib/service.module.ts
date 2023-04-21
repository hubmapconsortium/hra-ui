import { NgModule } from '@angular/core';
import { MockContactService } from './contact/contact.mock';
import { ContactService } from './contact/contact.service';

@NgModule({
  providers: [
    // TODO replace with real services
    {
      provide: ContactService,
      useExisting: MockContactService,
    },
  ],
})
export class HraServiceModule {}
