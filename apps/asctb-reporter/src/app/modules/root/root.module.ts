import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DoiModule } from '../../components/doi/doi.module';
import { ErrorComponent } from '../../components/error/error.component';
import { InfoComponent } from '../../components/info/info.component';
import { LegendComponent } from '../../components/legend/legend.component';
import { ControlPaneComponent } from '../control-pane/control-pane.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { PlaygroundModule } from '../playground/playground.module';
import { TreeModule } from '../tree/tree.module';
import { RootComponent } from './root.component';

@NgModule({
  declarations: [RootComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    NavbarComponent,
    ErrorComponent,
    PlaygroundModule,
    TreeModule,
    MatDialogModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    DragDropModule,
    DoiModule,
    InfoComponent,
    ControlPaneComponent,
    LegendComponent,
  ],
  exports: [RootComponent],
})
export class RootModule {}
