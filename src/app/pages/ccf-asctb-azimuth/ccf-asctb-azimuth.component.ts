import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, map, Observable } from 'rxjs';
import { PageDef } from 'src/app/components/page-element/page-def';
import { ExtraHeader, HeaderData } from 'src/app/components/table/header';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';
import { TableData } from '../../components/table/table';
import { TableDataService } from '../../services/table-data/tabledata.service';

interface CcfAsctbAzimuth {
  azimuthHeader: PageHeaderItems[];
  overviewAzimuthData: PageDataItems[];
  azimuthCtandCount: PageDataItems[];
  comparisonOfCXG: PageDataItems[];
  azimuthCTCounts: PageDataItems[];
  termsOfUse: PageDataItems[];
  references: PageDataItems[];
  headerInfo: HeaderData[]
  displayedColumnsData: string[];
  additionalHeaders: ExtraHeader[];
  additionalColumnsData: string[];
  cellData: ExtraHeader[];
  cellHeaders: string[];
}

@Component({
  selector: 'asctb-azimuth',
  templateUrl: './ccf-asctb-azimuth.component.html',
  styleUrls: ['./ccf-asctb-azimuth.component.scss']
})
export class CcfAsctbAzimuthComponent {
  data = this.route.snapshot.data['content'] as PageDef[];
  // azimuthHeader = this.data.azimuthHeader;
  // overviewAzimuthData = this.data.overviewAzimuthData;
  // azimuthCtandCount = this.data.azimuthCtandCount;
  // comparisonOfCXG = this.data.comparisonOfCXG;
  // azimuthCTCounts = this.data.azimuthCTCounts;
  // termsOfUse = this.data.termsOfUse;
  // References = this.data.references;
  // headerInfo = this.data.headerInfo.map((data) => ({
  //   ...data,
  //   cell: new Function('element', `return ${data.cell}`) as HeaderData['cell']
  // }))
  // displayedColumnsData = this.headerInfo.map(h => h.columnDef);
  // additionalHeaders = this.data.additionalHeaders
  // additionalColumnsData = this.additionalHeaders.map(h => h.columnDef)
  // cellData = this.data.cellData;
  // cellHeaders = this.cellData.map(h => h.columnDef)
  // tableData: Observable<TableData[]> = EMPTY;
  // columns: Observable<string[]> = EMPTY;

  // setData(): void {
  //   const data = this.dataService.getData('azimuth.csv', this.displayedColumnsData);
  //   this.tableData = data.pipe(map(result => result.data));
  // }

  constructor(private readonly dataService: TableDataService, private readonly route: ActivatedRoute) {
    // this.setData();
  }
}
