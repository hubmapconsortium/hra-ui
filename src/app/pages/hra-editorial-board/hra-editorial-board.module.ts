import { PageDataModule } from '../../components/page-data/page-data.module';
import { PageHeaderModule } from '../../components/page-header/page-header.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-markdown';
import { HraEditorialBoardComponent } from './hra-editorial-board.component';
import { BoardMembersComponent } from 'src/app/components/board-members/board-members.component';
import { BoardMembersModule } from 'src/app/components/board-members/board-members.module';


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
    MarkdownModule.forRoot()
  ],
  providers: [],
  bootstrap: []
})
export class HraEditorialBoardModule { }
