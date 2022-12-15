import { HeaderData } from '../../components/table/header';
import { TableData } from '../../components/table/table';


export const headerInfo: HeaderData[] = [
  {
    columnDef: 'organ',
    header: 'Organ',
    cell: (element: TableData) =>
      `<a class="cell-link" href="${
        element['url'] || 'TODO:Please add a url column to this .csv!'
      }">${element['organ']}</a>`,
  },
  {
    columnDef: 'sex',
    header: 'Sex',
    cell: (element: TableData) => `${element['sex']}`,
    alignment: 'left',
  },
  {
    columnDef: 'left/right',
    header: 'Left/Right',
    cell: (element: TableData) => `${element['left/right']}`,
    alignment: 'left',
  },
];

export const displayedColumnsData = headerInfo.map((h) => h.columnDef);
