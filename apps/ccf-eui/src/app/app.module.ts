import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideDesignSystem } from '@hra-ui/design-system';
import { ToggleButtonSizeDirective } from '@hra-ui/design-system/button-toggle';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { BackButtonBarComponent } from '@hra-ui/design-system/buttons/back-button-bar';
import { ExpansionPanelModule } from '@hra-ui/design-system/expansion-panel';
import { NavHeaderButtonsComponent } from '@hra-ui/design-system/nav-header-buttons';
import { BodyUiModule, InfoButtonModule, TrackingPopupModule } from 'ccf-shared';
import { AppWebComponent } from './app-web-component.component';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FiltersContentComponent } from './modules/filters/filters-content/filters-content.component';
import { OntologySelectionComponent } from './modules/ontology-exploration/ontology-selection/ontology-selection.component';
import { ResultsBrowserComponent } from './modules/results-browser/results-browser/results-browser.component';
import { DrawerModule } from './shared/components/drawer/drawer.module';
import { OrganSelectComponent } from './shared/components/organ-select/organ-select.component';
import { SpinnerOverlayModule } from './shared/components/spinner-overlay/spinner-overlay.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    DrawerModule,
    OntologySelectionComponent,
    MatIconModule,
    ResultsBrowserComponent,
    SpinnerOverlayModule,
    BodyUiModule,
    InfoButtonModule,
    MatTooltipModule,
    TrackingPopupModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    NavHeaderButtonsComponent,
    ExpansionPanelModule,
    ButtonsModule,
    MatMenuModule,
    BackButtonBarComponent,
    ToggleButtonSizeDirective,
    MatSidenavModule,
    FiltersContentComponent,
    OrganSelectComponent,
    MatDividerModule,
  ],
  declarations: [AppComponent, AppWebComponent],
  providers: [provideDesignSystem()],
})
export class AppModule {}
