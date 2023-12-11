import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { BaseHrefState } from './base-href';
import { LinkRegistryState } from './link-registry';
import { ResourceRegistryState } from './resource-registry';
import { StorageState } from './storage';

@NgModule({
  imports: [NgxsModule.forFeature([BaseHrefState, LinkRegistryState, ResourceRegistryState, StorageState])],
})
export class CdkStateModule {}
