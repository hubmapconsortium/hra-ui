import { NgModule } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
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
import { BodyUiModule, InfoButtonModule, OrganSelectorModule, TrackingPopupModule } from 'ccf-shared';

import { AppWebComponent } from './app-web-component.component';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FiltersPopoverModule } from './modules/filters/filters-popover/filters-popover.module';
import { OntologySelectionComponent } from './modules/ontology-exploration/ontology-selection/ontology-selection.component';
import { ResultsBrowserComponent } from './modules/results-browser/results-browser/results-browser.component';
import { ButtonToggleModule } from './shared/components/button-toggle/button-toggle.module';
import { DrawerModule } from './shared/components/drawer/drawer.module';
import { DualSliderModule } from './shared/components/dual-slider/dual-slider.module';
import { RunSpatialSearchModule } from './shared/components/run-spatial-search/run-spatial-search.module';
import { SpinnerOverlayModule } from './shared/components/spinner-overlay/spinner-overlay.module';
import { ViewerModule } from './shared/components/viewer/viewer.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    DrawerModule,
    FiltersPopoverModule,
    OntologySelectionComponent,
    MatIconModule,
    DualSliderModule,
    ResultsBrowserComponent,
    SpinnerOverlayModule,
    BodyUiModule,
    OrganSelectorModule,
    InfoButtonModule,
    MatTooltipModule,
    ViewerModule,
    TrackingPopupModule,
    MatSnackBarModule,
    RunSpatialSearchModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    ButtonToggleModule,

    NavHeaderButtonsComponent,
    ExpansionPanelModule,
    ButtonsModule,
    MatMenuModule,
    MatDividerModule,
    BackButtonBarComponent,
    ToggleButtonSizeDirective,
  ],
  declarations: [AppComponent, AppWebComponent],
  providers: [provideDesignSystem()],
})
export class AppModule {}
