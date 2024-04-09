import { NgModule } from '@angular/core';
import { BoardMembersComponent } from './board-members.component';
import { BrowserModule } from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [BoardMembersComponent],
  imports: [BrowserModule, MarkdownModule.forChild()],
  exports: [BoardMembersComponent],
})
export class BoardMembersModule {}
