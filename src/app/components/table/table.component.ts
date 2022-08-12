import { Component } from '@angular/core';
import { TableData } from './table';

interface HeaderData{
  header: string;
  columnDef: keyof TableData,
  cell: (element: TableData) => string,
  organname?:string
}


@Component({
  selector: 'ccf-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})


export class TableComponent {
  organs:string[] = [
    'Blood','Blood Vascular','Bone Marrow','Brain','Eye', 'Fallopian Tube',
    'Heart'
  ]
  transactions: TableData[] = [
    { as: 1, ct: 30, bTotal: 159, bg: 112, bp: 47, asas: 1, asct: 30, ctb: 506 },
    { as: 841, ct: 2, bTotal: 1, bg: 1, bp: 0, asas: 869, asct: 30, ctb: 506 },
    { as: 1, ct: 30, bTotal: 159, bg: 112, bp: 47, asas: 1, asct: 30, ctb: 506 },
    { as: 1, ct: 30, bTotal: 159, bg: 112, bp: 47, asas: 1, asct: 30, ctb: 506 },
    { as: 1, ct: 30, bTotal: 159, bg: 112, bp: 47, asas: 1, asct: 30, ctb: 506 },
    { as: 1, ct: 30, bTotal: 159, bg: 112, bp: 47, asas: 1, asct: 30, ctb: 506 },
    { as: 1, ct: 30, bTotal: 159, bg: 112, bp: 47, asas: 1, asct: 30, ctb: 506 },
  ];

  columns:HeaderData[]= [
    {
      columnDef: 'as',
      header: '#AS',
      cell: (element: TableData) => `${element.as}`,
      organname: 'Blood'
    },
    {
      columnDef: 'ct',
      header: '#CT',
      cell: (element: TableData) => `${element.ct}`,
      organname: 'Blood Vascular'
    },
    {
      columnDef: 'bTotal',
      header: '#B Total',
      cell: (element: TableData) => `${element.bTotal}`,
      organname: 'Bone Marrow'
    },
    {
      columnDef: 'bg',
      header: '#BG',
      cell: (element: TableData) => `${element.bg}`,
      organname: 'Brain'
    },
    {
      columnDef: 'bp',
      header: '#BP',
      cell: (element: TableData) => `${element.bp}`,
      organname:'Eye'
    },
    {
      columnDef: 'asas',
      header: '#AS-AS',
      cell: (element: TableData) => `${element.asas}`,
      organname: 'Fallopian Tube'
    },
    {
      columnDef: 'asct',
      header: 'AS-CT',
      cell: (element: TableData) => `${element.asct}`,
      organname:'Heart'
    },
    {
      columnDef: 'ctb',
      header: '#CT-B',
      cell: (element: TableData) => `${element.ctb}`,
    }
  ];
  displayedColumns:string[]=['organ','as','ct','bTotal','bg','bp','asas','asct','ctb']
  getTotalCost(ids: Exclude<keyof TableData, 'organ'> ) {
    return this.transactions.map((t: TableData) => t[ids]).reduce((acc, value) => acc + value, 0);
  }
  constructor() { }

}


