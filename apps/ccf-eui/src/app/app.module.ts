import { NgModule } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideDesignSystem } from '@hra-ui/design-system';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ButtonToggleSizeDirective } from '@hra-ui/design-system/buttons/button-toggle';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { NavHeaderButtonsComponent } from '@hra-ui/design-system/nav-header-buttons';
import { BackButtonBarComponent } from '@hra-ui/design-system/navigation/back-button-bar';
import { BodyUiModule, InfoButtonModule, TrackingPopupModule } from 'ccf-shared';

import { AppWebComponent } from './app-web-component.component';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FiltersContentComponent } from './modules/filters/filters-content/filters-content.component';
import { OntologySelectionComponent } from './modules/ontology-exploration/ontology-selection/ontology-selection.component';
import { ResultsBrowserComponent } from './modules/results-browser/results-browser/results-browser.component';
import { OrganSelectComponent } from './shared/components/organ-select/organ-select.component';
import { BodyUiComponent } from 'ccf-body-ui';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    OntologySelectionComponent,
    MatIconModule,
    ResultsBrowserComponent,
    BodyUiModule,
    InfoButtonModule,
    TrackingPopupModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    NavHeaderButtonsComponent,
    ButtonsModule,
    MatMenuModule,
    BackButtonBarComponent,
    ButtonToggleSizeDirective,
    MatSidenavModule,
    FiltersContentComponent,
    OrganSelectComponent,
    MatDividerModule,
    MatProgressBarModule,
    PlainTooltipDirective,
    BodyUiComponent,
  ],
  declarations: [AppComponent, AppWebComponent],
  providers: [provideDesignSystem()],
})
export class AppModule {}
