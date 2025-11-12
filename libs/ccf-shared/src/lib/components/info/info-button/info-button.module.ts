import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { InfoButtonComponent } from './info-button.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { InfoDialogModule } from '../info-dialog/info-dialog.module';

@NgModule({
  imports: [CommonModule, InfoDialogModule, MatIconModule],
  declarations: [InfoButtonComponent],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  exports: [InfoButtonComponent],
})
export class InfoButtonModule {}
