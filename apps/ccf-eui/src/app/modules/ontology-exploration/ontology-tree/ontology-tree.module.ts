import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { ToggleButtonSizeDirective } from '@hra-ui/design-system/button-toggle';

import { OntologyTreeComponent } from './ontology-tree.component';
import { TreeSizeDirective } from '@hra-ui/design-system/tree';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatTreeModule,
    MatButtonToggleModule,
    ToggleButtonSizeDirective,
    TreeSizeDirective,
  ],
  declarations: [OntologyTreeComponent],
  exports: [OntologyTreeComponent],
})
export class OntologyTreeModule {}
