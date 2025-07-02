import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ControlsModule } from '../../components/controls/controls.module';
import { LegendComponent } from '../../components/legend/legend.component';
import { OmapControlsModule } from '../../components/omap-controls/omap-controls.module';
import { SidenavModule } from '../../components/sidenav/sidenav.module';
import { FunctionsModule } from '../functions/functions.module';
import { ControlPaneComponent } from './control-pane.component';

@NgModule({
  declarations: [ControlPaneComponent],
  imports: [
    CommonModule,
    SidenavModule,
    MatButtonModule,
    FunctionsModule,
    ControlsModule,
    RouterModule,
    OmapControlsModule,
    LegendComponent,
  ],
  exports: [ControlPaneComponent],
})
export class ControlPaneModule {}
