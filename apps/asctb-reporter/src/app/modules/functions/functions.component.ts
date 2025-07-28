import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDna } from '@fortawesome/free-solid-svg-icons';
import { ButtonToggleSizeDirective } from '@hra-ui/design-system/buttons/button-toggle';
import { Select, Store } from '@ngxs/store';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Observable } from 'rxjs';
import { UpdateBimodalConfig } from '../../actions/tree.actions';
import {
  BimodalConfig,
  bimodalBSizeOptions,
  bimodalBTypeOptions,
  bimodalCTSizeOptions,
  bimodalSortOptions,
} from '../../models/bimodal.model';
import { GaAction, GaCategory } from '../../models/ga.model';
import { OmapConfig } from '../../models/omap.model';
import { Error } from '../../models/response.model';
import { BimodalService } from '../../modules/tree/bimodal.service';
import { SheetState } from '../../store/sheet.state';
import { TreeState } from '../../store/tree.state';

@Component({
  selector: 'app-functions',
  imports: [
    CommonModule,
    MatExpansionModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    FontAwesomeModule,
    MatButtonModule,
    MatButtonToggleModule,
    ButtonToggleSizeDirective,
  ],
  templateUrl: './functions.component.html',
  styleUrls: ['./functions.component.scss'],
})
export class FunctionsComponent {
  readonly store = inject(Store);
  readonly bms = inject(BimodalService);
  readonly ga = inject(GoogleAnalyticsService);

  bmSizeOptions = bimodalBSizeOptions;
  sortOptions = bimodalSortOptions;
  ctSizeOptions = bimodalCTSizeOptions;
  bimodalBTypeOptions = bimodalBTypeOptions;
  bimodalConfig!: BimodalConfig;
  faDna = faDna;

  @Input() error!: Error;

  @Select(TreeState.getBimodalConfig) config$!: Observable<BimodalConfig>;

  @Input() omaps: OmapConfig = { organsOnly: false, proteinsOnly: false };
  @Output() readonly updateConfig = new EventEmitter<OmapConfig>();

  constructor() {
    this.config$.subscribe((config) => {
      this.bimodalConfig = config;
    });
  }

  changeOptions(type: string, field: string, event: MatSelectChange) {
    (this.bimodalConfig as unknown as Record<string, Record<string, unknown>>)[type][field] = event.value;
    this.updateBimodal();
    this.ga.event(
      GaAction.CLICK,
      GaCategory.CONTROLS,
      `Change Cell Type (CT) or Biomarker (BM) Options: ${field}:${event.value}.toLowerCase()`,
    );
  }

  updateBimodal() {
    this.store.dispatch(new UpdateBimodalConfig(this.bimodalConfig)).subscribe(() => {
      const data = this.store.selectSnapshot(SheetState.getData);
      const treeData = this.store.selectSnapshot(TreeState.getTreeData);
      const bimodalConfig = this.store.selectSnapshot(TreeState.getBimodal).config;
      const sheetConfig = this.store.selectSnapshot(SheetState.getSheetConfig);
      const omapConfig = this.store.selectSnapshot(TreeState.getOmapConfig);
      const filteredProtiens = this.store.selectSnapshot(SheetState.getFilteredProtiens);
      if (data.length) {
        this.bms.makeBimodalData(data, treeData, bimodalConfig, false, sheetConfig, omapConfig, filteredProtiens);
      }
    });
  }

  /**
   * Action handler for the OMAP toggle button
   * @param event Click event
   */
  handleOMAPOptionToggle(event: Record<string, boolean>) {
    this.omaps.organsOnly = event['organsOnly'];
    this.omaps.proteinsOnly = event['proteinsOnly'];
    this.updateConfig.emit(this.omaps);
  }
}
