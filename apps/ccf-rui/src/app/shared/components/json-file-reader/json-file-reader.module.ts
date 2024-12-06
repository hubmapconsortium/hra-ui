import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonFileReaderComponent } from './json-file-reader.component';
import { ButtonModule } from '@hra-ui/design-system/button';

@NgModule({
  declarations: [JsonFileReaderComponent],
  imports: [CommonModule, ButtonModule],
  exports: [JsonFileReaderComponent],
})
export class JsonFileReaderModule {}
