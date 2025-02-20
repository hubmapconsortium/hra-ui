import { NgModule } from '@angular/core';
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
import { BodyUiModule, InfoButtonModule, TrackingPopupModule } from 'ccf-shared';

import { AppWebComponent } from './app-web-component.component';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FiltersPopoverModule } from './modules/filters/filters-popover/filters-popover.module';
import { OntologySelectionComponent } from './modules/ontology-exploration/ontology-selection/ontology-selection.component';
import { ResultsBrowserComponent } from './modules/results-browser/results-browser/results-browser.component';
import { DualSliderModule } from './shared/components/dual-slider/dual-slider.module';
import { OrganSelectComponent } from './shared/components/organ-select/organ-select.component';
import { RunSpatialSearchModule } from './shared/components/run-spatial-search/run-spatial-search.module';
import { SpinnerOverlayModule } from './shared/components/spinner-overlay/spinner-overlay.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    FiltersPopoverModule,
    OntologySelectionComponent,
    MatIconModule,
    DualSliderModule,
    ResultsBrowserComponent,
    SpinnerOverlayModule,
    BodyUiModule,
    InfoButtonModule,
    MatTooltipModule,
    TrackingPopupModule,
    MatSnackBarModule,
    RunSpatialSearchModule,
    MatSnackBarModule,
    MatButtonToggleModule,

    NavHeaderButtonsComponent,
    ExpansionPanelModule,
    ButtonsModule,
    MatMenuModule,
    BackButtonBarComponent,
    ToggleButtonSizeDirective,
    OrganSelectComponent,
  ],
  declarations: [AppComponent, AppWebComponent],
  providers: [provideDesignSystem()],
})
export class AppModule {}
