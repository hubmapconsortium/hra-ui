import { HeaderData } from '../../components/table/header';
import { TableData } from '../../components/table/table';


export const headerInfo: HeaderData[] = [
  {
    columnDef: 'Organ',
    header: 'Organ',
    cell: (element: TableData) => `<a class="cell-link" href="${element['url'] || 'TODO:Please add a url column to this .csv!'}">${element['Organ']}</a>`,
    isTotalRequired: true,
    alignment: 'start'
  },
  {
    columnDef: 'tableVersion',
    header: 'Table Version',
    cell: (element: TableData) => `${element['tableVersion']}`
  },
  {
    columnDef: 'AS',
    header: '#AS',
    cell: (element: TableData) => `${element['AS']}`
  },
  {
    columnDef: 'CT',
    header: '#CT',
    cell: (element: TableData) => `${element['CT']}`
  },
  {
    columnDef: 'B_Total',
    header: '#B Total',
    cell: (element: TableData) => `${element['B_Total']}`
  },
  {
    columnDef: 'BG',
    header: '#BG',
    cell: (element: TableData) => `${element['BG']}`
  },
  {
    columnDef: 'BP',
    header: '#BP',
    cell: (element: TableData) => `${element['BP']}`
  },
  {
    columnDef: 'BM',
    header: '#BM',
    cell: (element: TableData) => `${element['BM']}`
  },
  {
    columnDef: 'BF',
    header: '#BF',
    cell: (element: TableData) => `${element['BF']}`
  },
  {
    columnDef: 'BL',
    header: '#BL',
    cell: (element: TableData) => `${element['BL']}`
  },
  {
    columnDef: 'ASWithNoLink',
    header: '#AS With NoLink',
    cell: (element: TableData) => `${element['ASWithNoLink']}`
  },
  {
    columnDef: 'CTWithNoLink',
    header: '#CT With NoLink',
    cell: (element: TableData) => `${element['CTWithNoLink']}`
  },
  {
    columnDef: 'BWithNoLink',
    header: '#B With NoLink',
    cell: (element: TableData) => `${element['BWithNoLink']}`
  },
  {
    columnDef: 'ASWithNoCT',
    header: '#AS With NoCT',
    cell: (element: TableData) => `${element['ASWithNoCT']}`
  },
  {
    columnDef: 'CTWithNoB',
    header: '#CT With NoB',
    cell: (element: TableData) => `${element['CTWithNoB']}`
  },
  {
    columnDef: 'AS_AS',
    header: '#AS-AS',
    cell: (element: TableData) => `${element['AS_AS']}`
  },
  {
    columnDef: 'AS_CT',
    header: '#AS-CT',
    cell: (element: TableData) => `${element['AS_CT']}`
  },
  {
    columnDef: 'CT_BM',
    header: '#CT-BM',
    cell: (element: TableData) => `${element['CT_BM']}`,
  }
];

export const displayedColumnsData = headerInfo.map(h => h.columnDef);
