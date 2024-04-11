import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CopyClipboardComponent } from './copy-clipboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CopyClipboardComponent],
  imports: [BrowserModule, MatCardModule, MatButtonModule],
  exports: [CopyClipboardComponent],
})
export class CopyClipboardModule {}
