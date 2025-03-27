import { Component, Input, inject } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { faDna } from '@fortawesome/free-solid-svg-icons';
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
import { Error } from '../../models/response.model';
import { BimodalService } from '../../modules/tree/bimodal.service';
import { SheetState } from '../../store/sheet.state';
import { TreeState } from '../../store/tree.state';

@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrls: ['./functions.component.scss'],
  standalone: false,
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
}
