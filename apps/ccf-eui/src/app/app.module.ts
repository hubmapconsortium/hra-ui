import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideDesignSystem } from '@hra-ui/design-system';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ExpansionPanelModule } from '@hra-ui/design-system/expansion-panel';
import { NavHeaderButtonsComponent } from '@hra-ui/design-system/nav-header-buttons';
import { BodyUiModule, InfoButtonModule, TrackingPopupModule } from 'ccf-shared';

import { AppWebComponent } from './app-web-component.component';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FiltersPopoverModule } from './modules/filters/filters-popover/filters-popover.module';
import { OntologyExplorationModule } from './modules/ontology-exploration/ontology-exploration.module';
import { ResultsBrowserComponent } from './modules/results-browser/results-browser/results-browser.component';
import { ButtonToggleModule } from './shared/components/button-toggle/button-toggle.module';
import { DualSliderModule } from './shared/components/dual-slider/dual-slider.module';
import { RunSpatialSearchModule } from './shared/components/run-spatial-search/run-spatial-search.module';
import { SpinnerOverlayModule } from './shared/components/spinner-overlay/spinner-overlay.module';
import { BackButtonBarComponent } from '@hra-ui/design-system/buttons/back-button-bar';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    FiltersPopoverModule,
    OntologyExplorationModule,
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
    ButtonToggleModule,

    NavHeaderButtonsComponent,
    ExpansionPanelModule,
    ButtonsModule,
    MatMenuModule,
    MatDividerModule,
    BackButtonBarComponent,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    MatChipsModule,
    FormsModule,
  ],
  declarations: [AppComponent, AppWebComponent],
  providers: [provideDesignSystem()],
})
export class AppModule {}
