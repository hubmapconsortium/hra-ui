import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideDesignSystem } from '@hra-ui/design-system';
import { BackButtonBarComponent } from '@hra-ui/design-system/navigation/back-button-bar';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import {
  ExpansionPanelActionsComponent,
  ExpansionPanelComponent,
  ExpansionPanelHeaderContentComponent,
} from '@hra-ui/design-system/expansion-panel';
import { IconButtonSizeDirective } from '@hra-ui/design-system/icon-button';
import { NavHeaderButtonsComponent } from '@hra-ui/design-system/nav-header-buttons';
import { TrackingPopupModule } from 'ccf-shared';
import { provideNgxMask } from 'ngx-mask';
import { AppWebComponent } from './app-web-component.component';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ContentModule } from './modules/content/content.module';
import { LeftSidebarModule } from './modules/left-sidebar/left-sidebar.module';
import { RightSidebarModule } from './modules/right-sidebar/right-sidebar.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    MatIconModule,
    ContentModule,
    LeftSidebarModule,
    RightSidebarModule,
    TrackingPopupModule,
    MatSnackBarModule,
    NavHeaderButtonsComponent,
    ExpansionPanelComponent,
    ExpansionPanelActionsComponent,
    ExpansionPanelHeaderContentComponent,
    MatMenuModule,
    IconButtonSizeDirective,
    ButtonsModule,
    MatDividerModule,
    BackButtonBarComponent,
  ],
  declarations: [AppComponent, AppWebComponent],
  providers: [
    provideNgxMask(),
    provideDesignSystem(),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        floatLabel: true,
      },
    },
  ],
})
export class AppModule {}
