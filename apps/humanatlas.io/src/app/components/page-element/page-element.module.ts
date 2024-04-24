import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PageElementComponent } from './page-element.component';
import { PageHeaderModule } from '../page-header/page-header.module';
import { PageDataModule } from '../page-data/page-data.module';
import { UseButtonModule } from '../use-button/use-button.module';
import { ChooseVersionModule } from '../choose-version/choose-version.module';
import { SopLinksModule } from '../sop-links/sop-links.module';
import { BoardMembersModule } from '../board-members/board-members.module';
import { CardButtonLongModule } from '../card-button-long/card-button-long.module';
import { SimpleTileModule } from '../simple-tile/simple-tile.module';
import { AnnouncementCardModule } from '../announcement-card/announcement-card.module';
import { YoutubeModelModule } from '../youtube-model/youtube-model.module';
import { CardWithHeaderModule } from '../card-with-header/card-with-header.module';
import { SimpleImageModule } from '../simple-image/simple-image.module';
import { CarouselModule } from '../carousel/carousel.module';
import { TableModule } from '../table/table.module';
import { CountInfoCardModule } from '../count-info-card/count-info-card.module';
import { SectionCardModule } from '../section-card/section-card.module';
import { TableVersionModule } from '../table-version/table-version.module';
import { MatCardModule } from '@angular/material/card';
import { PrizeCardModule } from '../prize-card/prize-card.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MenuTreeModule } from '../menu-tree/menu-tree.module';
import { MatDividerModule } from '@angular/material/divider';
import { ContactCardModule } from '../contact-card/contact-card.module';
import { MatIconModule } from '@angular/material/icon';
import { OrganVersionModule } from '../organ-version/organ-version.module';
import { DownloadFtuModule } from '../download-ftu/download-ftu.module';
import { CopyClipboardModule } from '../copy-clipboard/copy-clipboard.module';
@NgModule({
  declarations: [PageElementComponent],
  imports: [
    BrowserModule,
    PageHeaderModule,
    PageDataModule,
    UseButtonModule,
    ChooseVersionModule,
    SopLinksModule,
    BoardMembersModule,
    CardButtonLongModule,
    SimpleTileModule,
    AnnouncementCardModule,
    YoutubeModelModule,
    CardWithHeaderModule,
    SimpleImageModule,
    CarouselModule,
    TableModule,
    CarouselModule,
    CountInfoCardModule,
    SectionCardModule,
    TableVersionModule,
    MatCardModule,
    PrizeCardModule,
    MatSidenavModule,
    MenuTreeModule,
    MatDividerModule,
    ContactCardModule,
    MatIconModule,
    OrganVersionModule,
    DownloadFtuModule,
    CopyClipboardModule,
  ],
  exports: [PageElementComponent],
})
export class PageElementModule {}
