import { SimpleTileModule } from './../../components/simple-tile/simple-tile.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ThreeDimRefPageComponent } from './three-dim-ref-page.component';
import { PageHeaderModule } from 'src/app/components/page-header/page-header.module';
import { PageDataModule } from 'src/app/components/page-data/page-data.module';
import { ChooseVersionModule } from 'src/app/components/choose-version/choose-version.module';
import { OrganTabsModule } from 'src/app/components/organ-tabs/organ-tabs.module';
import { SopLinksModule } from 'src/app/components/sop-links/sop-links.module';


@NgModule({
    declarations: [
        ThreeDimRefPageComponent
    ],
    imports: [
        BrowserModule,
        SimpleTileModule,
        PageHeaderModule,
        PageDataModule,
        ChooseVersionModule,
        OrganTabsModule,
        SopLinksModule
    ],
    providers: [],
    bootstrap: [ThreeDimRefPageComponent]
})
export class ThreeDimRefPageModule { }
