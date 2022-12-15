import { PageDataModule } from '../../components/page-data/page-data.module';
import { PageHeaderModule } from '../../components/page-header/page-header.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-markdown';
import { HraEditorialBoardComponent } from './hra-editorial-board.component';
import { BoardMembersModule } from 'src/app/components/board-members/board-members.module';
import { AnnouncementCardModule } from 'src/app/components/announcement-card/announcement-card.module';


@NgModule({
  declarations: [
    HraEditorialBoardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PageHeaderModule,
    BoardMembersModule,
    PageDataModule,
    MarkdownModule,
    AnnouncementCardModule
  ],
  providers: [],
  bootstrap: []
})
export class HraEditorialBoardModule { }
