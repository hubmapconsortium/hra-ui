import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideDesignSystem } from '@hra-ui/design-system';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { BackButtonBarComponent } from '@hra-ui/design-system/buttons/back-button-bar';
import { ExpansionPanelModule } from '@hra-ui/design-system/expansion-panel';
import { NavHeaderButtonsComponent } from '@hra-ui/design-system/nav-header-buttons';
import { BodyUiModule, InfoButtonModule, TrackingPopupModule } from 'ccf-shared';
import { AppWebComponent } from './app-web-component.component';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FiltersContentComponent } from './modules/filters/filters-content/filters-content.component';
import { OntologyExplorationModule } from './modules/ontology-exploration/ontology-exploration.module';
import { ResultsBrowserComponent } from './modules/results-browser/results-browser/results-browser.component';
import { ButtonToggleModule } from './shared/components/button-toggle/button-toggle.module';
import { DrawerModule } from './shared/components/drawer/drawer.module';
import { OrganSelectComponent } from './shared/components/organ-select/organ-select.component';
import { SpinnerOverlayModule } from './shared/components/spinner-overlay/spinner-overlay.module';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    DrawerModule,
    OntologyExplorationModule,
    MatIconModule,
    ResultsBrowserComponent,
    SpinnerOverlayModule,
    BodyUiModule,
    InfoButtonModule,
    MatTooltipModule,
    TrackingPopupModule,
    MatSnackBarModule,
    ButtonToggleModule,
    NavHeaderButtonsComponent,
    ExpansionPanelModule,
    ButtonsModule,
    MatMenuModule,
    BackButtonBarComponent,
    MatSidenavModule,
    FiltersContentComponent,
    OrganSelectComponent,
    MatDividerModule,
  ],
  declarations: [AppComponent, AppWebComponent],
  providers: [provideDesignSystem()],
})
export class AppModule {}
