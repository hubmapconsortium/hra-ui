import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { Error } from '../../models/response.model';
import { Sheet, SheetConfig } from '../../models/sheet.model';

@Component({
  selector: 'app-vis-controls',
  imports: [
    HraCommonModule,
    MatExpansionModule,
    MatInputModule,
    MatSliderModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    ButtonsModule,
  ],
  templateUrl: './vis-controls.component.html',
  styleUrls: ['./vis-controls.component.scss'],
})
export class VisControlsComponent {
  @Input() config!: SheetConfig;
  @Input() error!: Error;
  @Input() currentSheet!: Sheet;
  @Input() selectedOrgans!: string[];

  @Output() readonly updatedConfig = new EventEmitter<{
    property: string;
    config: SheetConfig;
  }>();

  changeWidth() {
    this.updatedConfig.emit({
      property: 'width',
      config: this.config,
    });
  }

  changeHeight() {
    this.updatedConfig.emit({
      property: 'height',
      config: this.config,
    });
  }

  changeShowOntology() {
    this.config.show_ontology = !this.config.show_ontology;
    this.updatedConfig.emit({
      property: 'show-ontology',
      config: this.config,
    });
  }

  showDiscrepencyLabel() {
    this.config.discrepencyLabel = !this.config.discrepencyLabel;
    this.config.discrepencyId = false;
    this.config.duplicateId = false;
    this.updatedConfig.emit({
      property: 'show-discrepency-label',
      config: this.config,
    });
  }

  showDiscrepencyId() {
    this.config.discrepencyId = !this.config.discrepencyId;
    this.config.discrepencyLabel = false;
    this.config.duplicateId = false;
    this.updatedConfig.emit({
      property: 'show-discrepency-id',
      config: this.config,
    });
  }

  showDuplicateId() {
    this.config.duplicateId = !this.config.duplicateId;
    this.config.discrepencyLabel = false;
    this.config.discrepencyId = false;
    this.updatedConfig.emit({
      property: 'show-duplicate-id',
      config: this.config,
    });
  }

  changeBimodalDistanceX() {
    this.updatedConfig.emit({
      property: 'bm-x',
      config: this.config,
    });
  }

  changeBimodalDistanceY() {
    this.updatedConfig.emit({
      property: 'bm-y',
      config: this.config,
    });
  }

  changeShowAS() {
    this.updatedConfig.emit({
      property: 'show-as',
      config: this.config,
    });
  }

  exportControls(event: Event) {
    event.stopPropagation();
    const sJson = JSON.stringify(this.config);
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=UTF-8,' + encodeURIComponent(sJson));
    element.setAttribute('download', 'asct-b-graph-config.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}
