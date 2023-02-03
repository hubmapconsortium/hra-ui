import { HeaderData } from "src/app/components/table/header";
import { TableData } from "src/app/components/table/table";

export const headerInfo: HeaderData[] = [
    // {
    //     columnDef: 'Organ',
    //     header: 'Organ',
    //     cell: (element: TableData) => element['Organ']
    // },
    {
        columnDef: 'FTU Label in Uberon',
        header: 'FTU Label in Uberon',
        cell: (element: TableData) => element['FTU Label in Uberon'],
        alignment: 'start'
    },
    {
        columnDef: 'FTU ID in Uberon',
        header: 'FTU ID in Uberon',
        cell: (element: TableData) => element['FTU ID in Uberon'],
        alignment: 'start'
    },
    {
        columnDef: 'CT Label in CL',
        header: 'CT Label in CL',
        cell: (element: TableData) => element['CT Label in CL'],
        alignment: 'start'
    },
    {
        columnDef: 'CT ID in CL',
        header: 'CT ID in CL',
        cell: (element: TableData) => element['CT ID in CL'],
        alignment: 'start'
    },
    {
        columnDef: 'CT Label in 2D Object',
        header: 'CT Label in 2D Object',
        cell: (element: TableData) => element['CT Label in 2D Object'],
        alignment: 'start',
        isTotalRequired: true
    },
    {
        columnDef: '#CT',
        header: '#CT',
        cell: (element: TableData) => element['#CT'],
        alignment: 'end'
    },
    {
        columnDef: '#AS',
        header: '#AS',
        cell: (element: TableData) => element['#AS'],
        alignment: 'end'
    }
];

export const displayedColumnsData = headerInfo.map(h => h.columnDef);
