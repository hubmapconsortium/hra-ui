import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideDesignSystem } from '@hra-ui/design-system';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import {
  ExpansionPanelActionsComponent,
  ExpansionPanelComponent,
  ExpansionPanelHeaderContentComponent,
} from '@hra-ui/design-system/expansion-panel';
import { NavHeaderButtonsComponent } from '@hra-ui/design-system/nav-header-buttons';
import { BackButtonBarComponent } from '@hra-ui/design-system/navigation/back-button-bar';
import { TrackingPopupModule } from 'ccf-shared';
import { provideNgxMask } from 'ngx-mask';
import { AppWebComponent } from './app-web-component.component';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ContentModule } from './modules/content/content.module';
import { LeftSidebarModule } from './modules/left-sidebar/left-sidebar.module';
import { RightSidebarModule } from './modules/right-sidebar/right-sidebar.module';
import { provideAnalytics, withRouterEvents, withErrorHandler } from '@hra-ui/common/analytics';
import { provideAppConfiguration } from '@hra-ui/common/injectors';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
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
    ButtonsModule,
    MatDividerModule,
    BackButtonBarComponent,
  ],
  declarations: [AppComponent, AppWebComponent],
  providers: [
    provideAppConfiguration({
      name: 'ccf-rui',
      version: '4.2.0',
      url: 'https://apps.humanatlas.io/rui/',
    }),
    provideAnalytics(withErrorHandler()),
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
