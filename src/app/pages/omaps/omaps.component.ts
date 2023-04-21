import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, map, Observable } from 'rxjs';
import { HeaderData } from 'src/app/components/table/header';
import { ChooseVersion } from '../../components/choose-version/choose-version';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';
import { SopLinks } from '../../components/sop-links/sop-links';
import { TableData } from '../../components/table/table';
import { TableDataService } from '../../services/table-data/tabledata.service';

interface Omaps {
  omapsHeading: PageHeaderItems[];
  overviewData: PageDataItems[];
  sopData: SopLinks[];
  omapsVersionData: ChooseVersion[];
  referencesData: PageDataItems[];
  goalsForOmaps: PageDataItems[];
  placeholderDate: ChooseVersion;
  columnHeaders: HeaderData[];
  displayedColumnsData: string[];
}

@Component({
  selector: 'omap',
  templateUrl: './omaps.component.html',
  styleUrls: ['./omaps.component.scss']
})
export class OmapsComponent {
  columns: Observable<string[]> = EMPTY;
  tableData: Observable<TableData[]> = EMPTY;
  
  data = this.route.snapshot.data['content'] as Omaps;
  omapsHeading = this.data.omapsHeading;
  overviewData = this.data.overviewData;
  sopData = this.data.sopData;
  omapsVersionData = this.data.omapsVersionData;
  referencesData = this.data.referencesData;
  placeholderDate = this.omapsVersionData[0];
  goalsForOmaps = this.data.goalsForOmaps;
  columnHeaders = this.data.columnHeaders.map((data) => ({
    ...data,
    cell: new Function('element', `return ${data.cell}`) as HeaderData['cell']
  }))
  displayedColumnsData = this.columnHeaders.map(h => h.columnDef);
  
  constructor(private readonly dataService: TableDataService, readonly route: ActivatedRoute) { 
    this.setOmapsData(this.omapsVersionData[0]);
  }

  setOmapsData(version: ChooseVersion): void {
    const data = this.dataService.getData(version.file, this.displayedColumnsData);
    this.tableData = data.pipe(map(result => result.data));
    this.columns = data.pipe(map(result => result.columns));
  }
}
