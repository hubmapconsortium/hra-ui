import { ExtraHeader, HeaderData } from '../../components/table/header';
import { TableData } from '../../components/table/table';


export const headerInfo: HeaderData[] = [
  {
    columnDef: 'organ',
    header: 'Organ',
    cell: (element: TableData) =>
      `<a class="cell-link" href="${
        element['url'] || 'TODO:Please add a url column to this .csv!'
      }">${element['organ']}</a>`,
    isTotalRequired: true,
  },
  {
    columnDef: 'uniqueName',
    header: 'Unique Names',
    cell: (element: TableData) => `${element['uniqueName']}`,
    sorting: false
  },
  {
    columnDef: 'uniqueId',
    header: 'Unique IDs',
    cell: (element: TableData) => `${element['uniqueId']}`,
    sorting: false
  },
  {
    columnDef: 'uName',
    header: 'Unique Names',
    cell: (element: TableData) => `${element['uName']}`,
    sorting: false
  },
  {
    columnDef: 'uId',
    header: 'Unique \nIDs',
    cell: (element: TableData) => `${element['uId']}`,
    sorting: false
  },
  {
    columnDef: 'usingId',
    header: 'Using IDs',
    cell: (element: TableData) => `${element['usingId']}`,
    sorting: false
  },
  {
    columnDef: 'usingLabels',
    header: 'Using Labels',
    cell: (element: TableData) => `${element['usingLabels']}`,
    sorting: false
  },
  {
    columnDef: 'dummyAnnotationLevels',
    header: '',
    cell: (element: TableData) => `${element['a']}`,
    sorting: false,
  },
  {
    columnDef: 'dummyTotalCellCount',
    header: '',
    cell: (element: TableData) => `${element['b']}`,
    sorting: false,
  },
  {
    columnDef: 'dummyAzimuthB',
    header: '',
    cell: (element: TableData) => `${element['c']}`,
    sorting: false,
  },
  {
    columnDef: 'dummyAsctbB',
    header: '',
    cell: (element: TableData) => `${element['d']}`,
    sorting: false,
  },
  {
    columnDef: 'dummyMatchesB',
    header: '',
    cell: (element: TableData) => `${element['e']}`,
    sorting: false
  },
];

export const displayedColumnsData = headerInfo.map((h) => h.columnDef);

export const additionalHeaders: ExtraHeader[] = [
  {
    header: 'Azimuth',
    columnDef: 'azimuthCT',
    colspan: 3,
  },
  {
    header: 'ASCT+B v1.0',
    columnDef: 'asctbVersionCT',
    colspan: 1,
  },
  {
    header: 'Matches',
    columnDef: 'matchesCT',
    colspan: 3,
  },
  {
    header: 'Azimuth',
    columnDef: 'azimuthB',
  },
  {
    header: 'ASCT+B',
    columnDef: 'asctbVersionB',
  },
  {
    header: 'Matches',
    columnDef: 'matchesB',
  },
];

export const additionalColumnsData = additionalHeaders.map((h) => h.columnDef);

export const cellData: ExtraHeader[] = [
  {
    columnDef: 'cellTypes',
    header: 'Cell Types',
    colspan: 7,
  },
  {
    columnDef: 'annotationLevels',
    header: 'Annotation Levels in Azimuth Reference',
    rowspan: 3,
  },
  {
    columnDef: 'totalCellCount',
    header: 'Total Cell Count in Aziumuth Reference',
    rowspan: 3,
  },
  {
    columnDef: 'biomarkers',
    header: 'Biomarkers',
    colspan: 3,
  },
];

export const cellHeaders = cellData.map((h) => h.columnDef);
