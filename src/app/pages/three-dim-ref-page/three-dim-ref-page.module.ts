import { SimpleTileModule } from './../../components/simple-tile/simple-tile.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ThreeDimRefPageComponent } from './three-dim-ref-page.component';
import { PageHeaderModule } from '../../components/page-header/page-header.module';
import { PageDataModule } from '../../components/page-data/page-data.module';
import { ChooseVersionModule } from '../../components/choose-version/choose-version.module';
import { OrganTabsModule } from '../../components/organ-tabs/organ-tabs.module';
import { SopLinksModule } from '../../components/sop-links/sop-links.module';
import { TwoDimImageModule } from '../../components/two-dim-image/two-dim-image.module';
import { AnnouncementCardModule } from '../../components/announcement-card/announcement-card.module';
import { UseButtonModule } from 'src/app/components/use-button/use-button.module';


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
        AnnouncementCardModule,
        UseButtonModule
    ],
    providers: [],
    bootstrap: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ThreeDimRefPageModule { }
