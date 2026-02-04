import { NgModule } from '@angular/core';
import { InfoModalComponent } from '@hra-ui/design-system/modal/info-modal';
import { ImageModalComponent } from '@hra-ui/design-system/modal/image-modal';

/** All sub library components, module, etc. */
const REEXPORTS = [InfoModalComponent, ImageModalComponent];

/** Exports all brand components, modules, etc. */
@NgModule({
  imports: REEXPORTS,
  exports: REEXPORTS,
})
export class ModalModule {}
