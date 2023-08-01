import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { LinkRegistryState } from './link-registry';
import { ResourceRegistryState } from './resource-registry';
import { StorageState } from './storage';

@NgModule({
  imports: [NgxsModule.forFeature([LinkRegistryState, ResourceRegistryState, StorageState])],
})
export class CdkStateModule {}
