import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { InfoButtonComponent } from './info-button.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { InfoDialogModule } from '../info-dialog/info-dialog.module';

@NgModule({ declarations: [InfoButtonComponent],
    exports: [InfoButtonComponent], imports: [CommonModule, InfoDialogModule, MatIconModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class InfoButtonModule {}
