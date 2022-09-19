import { Component } from '@angular/core';

export interface PeriodicElement {
  label: string;
  value: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { label: 'Creator(s):', value: 'Lorem ipsum'},
  { label: 'Creator ORCID:', value: '0000-0003-4066-7531'},
  { label: 'Project Lead:', value: 'Katy Börner'},
  { label: 'Project Lead ORCID:', value: '0000-0002-3321-6137'},
  { label: 'Reviewer(s):', value: 'Lorem ipsum'},
  { label: 'Reviewer ORCID(s):', value: 'Lorem ipsum'},
  { label: 'Date:', value: 'Lorem ipsum'},
  { label: 'License:', value: 'Lorem ipsum'},
  { label: 'Publisher:', value: 'Lorem ipsum'},
  { label: 'Funder:', value: 'Lorem ipsum'},
  { label: 'Award Number:', value: 'OT2OD026671'},
  { label: 'HuBMAP ID:', value:'HuBMAP ID:'},
  { label: 'Download 2D Data:', value: 'Lorem ipsum, v1.0'},
  { label: 'DOI:', value: 'https://doi.org/10.48539/HBM724.XTTN.487'},
  { label: 'How to Cite This 2D Data:', value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
  { label: 'How to Cite This 2D Data Overall:', value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
];

@Component({
  selector: 'ccf-tissue-info',
  templateUrl: './tissue-info-table.component.html',
  styleUrls: ['./tissue-info-table.component.scss']
})
export class TissueInfoTableComponent {
  columns = [
    {
      columnDef: 'label',
      header: 'Label',
      cell: (element: PeriodicElement) => `${element.label}`,
    },
    {
      columnDef: 'name',
      header: 'Value',
      cell: (element: PeriodicElement) => `${element.value}`,
    }
  ];
  dataSource = ELEMENT_DATA;
  displayedColumns = this.columns.map(c => c.columnDef);
}
