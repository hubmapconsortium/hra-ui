import { NgModule } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TrackingPopupModule } from 'ccf-shared';
import { AppWebComponent } from './app-web-component.component';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DEFAULT_THEME } from './core/services/theming/theming.service';
import { ContentModule } from './modules/content/content.module';
import { HeaderModule } from './modules/header/header.module';
import { LeftSidebarModule } from './modules/left-sidebar/left-sidebar.module';
import { RegistrationModalModule } from './modules/registration-modal/registration-modal/registration-modal.module';
import { RightSidebarModule } from './modules/right-sidebar/right-sidebar.module';
import { DrawerModule } from './shared/components/drawer/drawer.module';
import { NavHeaderButtonsComponent } from '@hra-ui/design-system/nav-header-buttons';
import { provideDesignSystem } from '@hra-ui/design-system';
import {
  ExpansionPanelActionsComponent,
  ExpansionPanelComponent,
  ExpansionPanelHeaderContentComponent,
} from '@hra-ui/design-system/expansion-panel';
import { MatMenuModule } from '@angular/material/menu';
import { IconButtonSizeDirective } from '@hra-ui/design-system/icon-button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ButtonModule } from '@hra-ui/design-system/button';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    MatIconModule,
    DrawerModule,
    HeaderModule,
    ContentModule,
    LeftSidebarModule,
    RightSidebarModule,
    RegistrationModalModule,
    TrackingPopupModule,
    MatSnackBarModule,
    NavHeaderButtonsComponent,
    ExpansionPanelComponent,
    ExpansionPanelActionsComponent,
    ExpansionPanelHeaderContentComponent,
    MatMenuModule,
    IconButtonSizeDirective,
    MatButtonToggleModule,
    ButtonModule,
  ],
  declarations: [AppComponent, AppWebComponent],
  providers: [
    provideDesignSystem(),
    {
      provide: DEFAULT_THEME,
      useValue: 'hubmap-theme-light',
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        floatLabel: true,
      },
    },
  ],
})
export class AppModule {}
