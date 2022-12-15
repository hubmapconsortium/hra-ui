import { SimpleTileModule } from './../../components/simple-tile/simple-tile.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ThreeDimRefPageComponent } from './three-dim-ref-page.component';
import { PageHeaderModule } from 'src/app/components/page-header/page-header.module';
import { PageDataModule } from 'src/app/components/page-data/page-data.module';
import { ChooseVersionModule } from 'src/app/components/choose-version/choose-version.module';
import { OrganTabsModule } from 'src/app/components/organ-tabs/organ-tabs.module';
import { SopLinksModule } from 'src/app/components/sop-links/sop-links.module';
import { TwoDimImageModule } from 'src/app/components/two-dim-image/two-dim-image.module';
import { AnnouncementCardModule } from 'src/app/components/announcement-card/announcement-card.module';


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
        SopLinksModule,
        TwoDimImageModule,
        AnnouncementCardModule
    ],
    providers: [],
    bootstrap: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ThreeDimRefPageModule { }
